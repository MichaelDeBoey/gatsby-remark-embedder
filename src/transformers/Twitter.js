import { fetchOEmbedData, includesSomeOfArray } from './utils';

export const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return (
    ['twitter.com', 'www.twitter.com'].includes(host) &&
    (pathname.includes('/status/') ||
      (includesSomeOfArray(pathname, [
        '/events/',
        '/moments/',
        '/timelines/',
      ]) &&
        !pathname.includes('/edit/')))
  );
};

export const getHTML = (url) => {
  /**
   * For moments, Twitter oembed doesn't work with urls using 'events', they should
   * use 'moments', even though they redirect from 'moments' to 'events' on the browser.
   */
  const twitterUrl = url.replace('events', 'moments');

  return fetchOEmbedData(
    `https://publish.twitter.com/oembed?url=${twitterUrl}&dnt=true&omit_script=true`
  ).then(({ html }) =>
    [html]
      .map((s) => s.replace(/\?ref_src=twsrc.*?fw/g, ''))
      .map((s) => s.replace(/<br>/g, '<br />'))
      .join('')
      .trim()
  );
};
