import { fetchOEmbedData } from './utils';

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

export const buildUrl = (url, options = {}) => {
  // https://www.instagram.com/developer/embedding/#oembed
  const urlObj = new URL(`https://api.instagram.com/oembed`);
  urlObj.search = new URLSearchParams({
    url,
    omitscript: true,
    ...options,
  });
  return urlObj.toString();
};

export const getHTML = (url, options) => {
  const oEmbedUrl = buildUrl(url, options);
  return fetchOEmbedData(oEmbedUrl).then(({ html }) => html);
};
