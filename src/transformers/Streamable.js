import { URL } from 'url';
import fetch from 'node-fetch';

export const getNormalizedStreamableUrl = url => {
  const { pathname } = new URL(url);
  const streamableEmbedUrl = 'https://api.streamable.com/oembed.json?url=';
  const trimmedPathName = getTrimmedPathName(pathname).split('/');

  if (trimmedPathName.length === 1) {
    return `${streamableEmbedUrl}${url}`;
  }

  return `${streamableEmbedUrl}https://streamable.com/${trimmedPathName[1]}`;
};

const getTrimmedPathName = pathname => pathname.replace(/^\/|\/+$/g, '');

const ignoredPaths = [
  '/documentation',
  '/login',
  '/recover',
  '/settings',
  '/signup',
];

const possibleCachePaths = ['e', 'g', 'o', 's', 't'];

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  const trimmedPathName = getTrimmedPathName(pathname).split('/');

  return (
    ['streamable.com', 'www.streamable.com'].includes(host) &&
    trimmedPathName.length > 0 &&
    trimmedPathName.length <= 3 &&
    ((trimmedPathName.length === 1 && !ignoredPaths.includes(pathname)) ||
      possibleCachePaths.includes(trimmedPathName[0]))
  );
};

export const getHTML = url =>
  fetch(`${getNormalizedStreamableUrl(url)}`)
    .then(({ json }) => json())
    .then(({ html }) => html);
