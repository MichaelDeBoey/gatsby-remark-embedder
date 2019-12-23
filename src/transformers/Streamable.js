import { URL } from 'url';
import fetch from 'node-fetch';

const getTrimmedPathName = pathname => pathname.replace(/^\/|\/+$/g, '');

const includesSomeOfArray = (string, array) =>
  array.some(item => string.includes(item));

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  const trimmedPathName = getTrimmedPathName(pathname).split('/');

  return (
    ['streamable.com', 'www.streamable.com'].includes(host) &&
    !includesSomeOfArray(pathname, [
      'documentation',
      'login',
      'recover',
      'settings',
      'signup',
    ]) &&
    trimmedPathName.length > 0 &&
    trimmedPathName.length <= 3 &&
    (trimmedPathName.length === 1 ||
      includesSomeOfArray(pathname, ['/e/', '/g/', '/o/', '/s/', '/t/']))
  );
};

export const getHTML = url =>
  fetch(`https://api.streamable.com/oembed.json?url=${url}`)
    .then(({ json }) => json())
    .then(({ html }) => html);
