import fetch from 'node-fetch';

export const shouldTransform = url =>
  /^https?:\/\/streamable\.com\/?[|s|o|\D].+/.test(url);

export const getHTML = url =>
  fetch(`https://api.streamable.com/oembed.json?url=${url}`)
    .then(res => res.json())
    .then(({ html }) => html);
