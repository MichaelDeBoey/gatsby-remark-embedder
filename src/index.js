import visit from 'unist-util-visit';

import * as CodePenTransformer from './CodePen';
import * as CodeSandboxTransformer from './CodeSandbox';
import * as SoundCloudTransformer from './SoundCloud';
import * as SlidesTransformer from './Slides';
import * as TwitterTransformer from './Twitter';
import * as YouTubeTransformer from './YouTube';

const transformers = [
  CodePenTransformer,
  CodeSandboxTransformer,
  SlidesTransformer,
  SoundCloudTransformer,
  TwitterTransformer,
  YouTubeTransformer,
];

const getUrlString = url => {
  const urlString = url.startsWith('http') ? url : `https://${url}`;

  try {
    return new URL(urlString).toString();
  } catch (error) {
    return null;
  }
};

export default async ({ cache, markdownAST }) => {
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
          node.children = undefined;
        });
      }
    });
  });

  await Promise.all(transformations.map(t => t()));

  return markdownAST;
};
