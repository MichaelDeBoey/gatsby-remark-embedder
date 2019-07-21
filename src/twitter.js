import { URL } from 'url';
import fetch from 'node-fetch';

export const shouldTransform = string => {
  const { host, pathname } = new URL(string);

  return host.endsWith('twitter.com') && pathname.includes('/status/');
};

export const getHTML = string =>
  fetch(`https://publish.twitter.com/oembed?url=${string}c&omit_script=true`)
    .then(r => r.json())
    .then(r =>
      [r.html]
        .map(s => s.replace(/\?ref_src=twsrc.*?fw/g, ''))
        .map(s => s.replace(/<br>/g, '<br />'))
        .join('')
        .trim()
    );
