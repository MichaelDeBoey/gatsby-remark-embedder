import wrapFetch from 'fetch-retry';
import fetch from 'node-fetch';

const fetchWithRetries = wrapFetch(fetch);
export const fetchOEmbedData = url =>
  fetchWithRetries(url, {
    retries: 3,
    retryDelay: attempt => 2 ** attempt * 1000,
  }).then(data => data.json());

export const getTrimmedPathName = pathname =>
  // Trim leading and trailing slashes
  pathname.replace(/^\/|\/+$/g, '');

export const includesSomeOfArray = (string, array) =>
  array.some(item => string.includes(item));
