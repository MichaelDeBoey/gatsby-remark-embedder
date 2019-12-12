import fetch from 'node-fetch';

export const shouldTransform = url => /^https?:\/\/streamable\.com\//.test(url);

export const getHTML = url =>
  fetch(`https://api.streamable.com/oembed.json?url=${url}`)
    .then(res => res.json().then(streamable => streamable.html))
    .catch(err => err);
