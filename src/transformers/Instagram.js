import { URL, URLSearchParams } from 'url';
import { fetchOEmbedData } from './utils';

export const serviceName = 'instagram';

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

export const buildUrl = url => {
  return `https://api.instagram.com/oembed?url=${url}&omitscript=true`;
};

export const getHTML = (url, options) => {
  const oEmbedUrl = buildUrl(url, options);
  return fetchOEmbedData(oEmbedUrl).then(({ html }) => html);
};
