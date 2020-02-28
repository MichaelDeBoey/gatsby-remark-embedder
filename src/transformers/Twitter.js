import { URL, URLSearchParams } from 'url';

import { fetchOEmbedData, includesSomeOfArray } from './utils';

export const serviceName = 'twitter';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  return (
    ['twitter.com', 'www.twitter.com'].includes(host) &&
    (pathname.includes('/status/') ||
      (includesSomeOfArray(pathname, ['/events/', '/moments/']) &&
        !pathname.includes('/edit/')))
  );
};

export const buildUrl = url => {
  return `https://publish.twitter.com/oembed?url=${url}&dnt=true&omit_script=true`;
};

export const getHTML = (url, options) => {
  const oEmbedUrl = buildUrl(url, options);
  return fetchOEmbedData(oEmbedUrl).then(({ html }) =>
    [html]
      .map(s => s.replace(/\?ref_src=twsrc.*?fw/g, ''))
      .map(s => s.replace(/<br>/g, '<br />'))
      .join('')
      .trim()
  );
};
