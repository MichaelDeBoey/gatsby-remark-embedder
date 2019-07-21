import visit from 'unist-util-visit';

import * as CodeSandboxTransformer from './codesandbox';
import * as TwitterTransformer from './twitter';
import * as YouTubeTransformer from './youtube';

const transformers = [
  YouTubeTransformer,
  TwitterTransformer,
  CodeSandboxTransformer,
];

const getUrlString = string => {
  const urlString = string.startsWith('http') ? string : `https://${string}`;

  try {
    return new URL(urlString).toString();
  } catch (error) {
    return null;
  }
};

export default async ({ markdownAST, cache }) => {
  const transformations = [];
  visit(markdownAST, 'paragraph', paragraphNode => {
    if (paragraphNode.children.length !== 1) {
      return;
    }

    const [node] = paragraphNode.children;
    const isText = node.type === 'text';
    // it's a valid link if there's no title, and the value is the same as the URL
    const isValidLink =
      node.type === 'link' &&
      node.title === null &&
      node.children[0].value === node.url;
    if (!isText && !isValidLink) {
      return;
    }

    const { url, value = url } = node;

    const urlString = getUrlString(value);
    if (!urlString) {
      return;
    }

    transformers.forEach(transformer => {
      if (transformer.shouldTransform(urlString)) {
        transformations.push(async () => {
          let html = await cache.get(urlString);
          if (!html) {
            html = await transformer.getHTML(urlString);
            await cache.set(urlString, html);
          }
          node.type = `html`;
          node.value = html;
        });
      }
    });
  });
  const promises = transformations.map(t => t());
  await Promise.all(promises);

  return markdownAST;
};
