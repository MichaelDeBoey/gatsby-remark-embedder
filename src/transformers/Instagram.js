import { fetchOEmbedData } from './utils';

export const shouldTransform = (url) => {
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

export const getHTML = (url, { accessToken }) =>
  fetchOEmbedData(
    `https://graph.facebook.com/v8.0/instagram_oembed?url=${url}&access_token=${accessToken}&omitscript=true`
  ).then(({ html }) => html);

export const name = 'Instagram';
