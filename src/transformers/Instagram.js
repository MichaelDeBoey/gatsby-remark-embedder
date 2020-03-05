import { URL } from 'url';

import { fetchOEmbedData } from './utils';

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

export const getHTML = url =>
  fetchOEmbedData(
    `https://api.instagram.com/oembed?url=${url}&omitscript=true`
  ).then(({ html }) => html);
