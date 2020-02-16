import { URL, URLSearchParams } from 'url';

import { fetchOEmbedData, includesSomeOfArray } from './utils';

export const name = 'twitter';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  return (
    ['twitter.com', 'www.twitter.com'].includes(host) &&
    (pathname.includes('/status/') ||
      (includesSomeOfArray(pathname, ['/events/', '/moments/']) &&
        !pathname.includes('/edit/')))
  );
};

export const buildUrl = (url, options = {}) => {
  // https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/get-statuses-oembed
  const urlObj = new URL(`https://publish.twitter.com/oembed`);
  urlObj.search = new URLSearchParams({
    url,
    dnt: true,
    // prettier-ignore
    'omit_script': true,
    ...options.params,
  });
  return urlObj.toString();
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
