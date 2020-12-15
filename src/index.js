import parse5 from 'parse5';
import fromParse5 from 'hast-util-from-parse5';
import visit from 'unist-util-visit';

import { defaultTransformers } from './transformers';

// results in an AST node of type "root" with a single "children" node of type "element"
// so we return the first (and only) child "element" node
const htmlToHast = (string) =>
  fromParse5(parse5.parseFragment(string)).children[0];

const getUrlString = (url) => {
  const urlString = url.startsWith('http') ? url : `https://${url}`;

  try {
    return new URL(urlString).toString();
  } catch (error) {
    return null;
  }
};

export default async (
  { cache, markdownAST },
  { customTransformers = [], services = {} } = {}
) => {
  const transformers = [...defaultTransformers, ...customTransformers];

  const transformations = [];
  visit(markdownAST, 'paragraph', (paragraphNode) => {
    if (paragraphNode.children.length !== 1) {
      return;
    }

    const [node] = paragraphNode.children;
    const isText = node.type === 'text';
    // it's a valid link if there's no title, and the value is the same as the URL
    const isValidLink =
      node.type === 'link' &&
      node.title === null &&
      node.children.length === 1 &&
      node.children[0].value === node.url;
    if (!isText && !isValidLink) {
      return;
    }

    const { url, value = url } = node;

    const urlString = getUrlString(value);
    if (!urlString) {
      return;
    }

    transformers
      .filter(({ shouldTransform }) => shouldTransform(urlString))
      .forEach(({ getHTML, name = '' }) => {
        transformations.push(async () => {
          try {
            let html = await cache.get(urlString);

            if (!html) {
              html = await getHTML(urlString, services[name] || {});
              await cache.set(urlString, html);
            }

            // if nothing's returned from getHTML, then no modifications are needed
            if (!html) return;

            // convert the HTML string into an AST
            const htmlElement = htmlToHast(html);

            // set the paragraphNode.data with the necessary properties
            paragraphNode.data = {
              hName: htmlElement.tagName,
              hProperties: htmlElement.properties,
              hChildren: htmlElement.children,
            };
          } catch (error) {
            error.message = `The following error appeared while processing '${urlString}':\n\n${error.message}`;

            throw error;
          }
        });
      });
  });

  await Promise.all(transformations.map((t) => t()));

  return markdownAST;
};
