import { URL } from 'url';
import fetch from 'node-fetch';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    ['twitter.com', 'www.twitter.com'].includes(host) &&
    pathname.includes('/status/')
  );
};

export const getHTML = url =>
  fetch(
    `https://publish.twitter.com/oembed?url=${url}&dnt=true&omit_script=true`
  )
    .then(r => r.json())
    .then(r =>
      [r.html]
        .map(s => s.replace(/\?ref_src=twsrc.*?fw/g, ''))
        .map(s => s.replace(/<br>/g, '<br />'))
        .join('')
        .trim()
    );
