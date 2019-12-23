import fetch from 'node-fetch';
import { URL } from 'url';

const includesSomeOfArray = (string, array) =>
  array.some(item => string.includes(item));

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  if (!includesSomeOfArray(host, ['streamable.com', 'www.streamable.com'])) {
    return false;
  }
  const pathSections = pathname
    .split('/')
    .filter(pathSection => pathSection !== '');
  if (pathSections.length === 1) {
    return true;
  } else if (pathSections.length === 2 || pathSections.length === 3) {
    return includesSomeOfArray(pathname, ['/s/', '/o/']);
  }
  return false;
};

export const getHTML = url =>
  fetch(`https://api.streamable.com/oembed.json?url=${url}`)
    .then(({ json }) => json())
    .then(({ html }) => html);
