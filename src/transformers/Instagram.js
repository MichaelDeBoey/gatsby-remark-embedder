import { fetchOEmbedData } from './utils';

export const name = 'instagram';

export const name = 'instagram';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  return (
    [
      'instagr.am',
      'www.instagr.am',
      'instagram.com',
      'www.instagram.com',
    ].includes(host) && pathname.includes('/p/')
  );
};

<<<<<<< HEAD
export const buildUrl = (url, options = {}) => {
=======
export const getHTML = (url, options) => {
>>>>>>> add instagram custom parameter support
  // https://www.instagram.com/developer/embedding/#oembed
  const urlObj = new URL(`https://api.instagram.com/oembed`);
  urlObj.search = new URLSearchParams({
    url,
    omitscript: true,
    ...options,
  });
<<<<<<< HEAD
  return urlObj.toString();
};

export const getHTML = (url, options) => {
  const oEmbedUrl = buildUrl(url, options);
  return fetchOEmbedData(oEmbedUrl).then(({ html }) => html);
=======

  return fetch(urlObj.toString())
    .then(({ json }) => json())
    .then(({ html }) => html);
>>>>>>> add instagram custom parameter support
};
