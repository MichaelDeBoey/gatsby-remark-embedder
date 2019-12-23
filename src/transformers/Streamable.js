import { URL } from 'url';
import fetch from 'node-fetch';

export const getNormalizedStreamableUrl = url => {
  const splitUrlSegments = url.split('/');
  return splitUrlSegments.length > 4
    ? splitUrlSegments[4]
    : splitUrlSegments[3];
};

const getTrimmedPathName = pathname => pathname.replace(/^\/|\/+$/g, '');

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  const trimmedPathName = getTrimmedPathName(pathname).split('/');

  return (
    ['streamable.com', 'www.streamable.com'].includes(host) &&
    trimmedPathName.length > 0 &&
    trimmedPathName.length <= 3 &&
    ((trimmedPathName.length === 1 &&
      ![
        '/documentation',
        '/login',
        '/recover',
        '/settings',
        '/signup',
      ].includes(pathname)) ||
      ['e', 'g', 'o', 's', 't'].includes(trimmedPathName[0]))
  );
};

export const getHTML = url =>
  fetch(
    `https://api.streamable.com/oembed.json?url=${getNormalizedStreamableUrl(
      url
    )}`
  )
    .then(({ json }) => json())
    .then(({ html }) => html);
