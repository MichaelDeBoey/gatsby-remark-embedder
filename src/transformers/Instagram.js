import { URL } from 'url';
import fetch from 'node-fetch';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    ['instagr.am', 'www.instagram.com', 'instagram.com'].includes(host) &&
    pathname.includes('/p/')
  );
};

export const getHTML = url =>
  fetch(`https://api.instagram.com/oembed?url=${url}&omitscript=true`)
    .then(r => r.json())
    .then(r =>
      [r.html]
        .map(s => s.replace(/\?&amp;utm_campaign*?/g, ''))
        .join('')
        .trim()
    );
