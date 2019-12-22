import fetch from 'node-fetch';

export const shouldTransform = url =>
  /^https?:\/\/streamable\.com\/?[|s|o|\D].+/.test(url);

export const getHTML = url =>
  fetch(`https://api.streamable.com/oembed.json?url=${url}`)
    .then(({ json }) => json())
    .then(({ html }) => html);
