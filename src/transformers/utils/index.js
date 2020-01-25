import fetch from 'node-fetch';
import wrapFetch from 'fetch-retry';

const fetchWithRetries = wrapFetch(fetch);

export const fetchOEmbedData = url =>
  fetchWithRetries(url, {
    retries: 3,
    retryDelay: attempt => {
      return 2 ** attempt * 1000; // 1000, 2000, 4000
    },
  }).then(data => data.json());

export const getTrimmedPathName = pathname =>
  // Trim leading and trailing slashes
  pathname.replace(/^\/|\/+$/g, '');

export const includesSomeOfArray = (string, array) =>
  array.some(item => string.includes(item));
