import fetch from 'node-fetch';

export const fetchOEmbedData = url => fetch(url).then(data => data.json());

export const getTrimmedPathName = pathname =>
  // Trim leading and trailing slashes
  pathname.replace(/^\/|\/+$/g, '');

export const includesSomeOfArray = (string, array) =>
  array.some(item => string.includes(item));
