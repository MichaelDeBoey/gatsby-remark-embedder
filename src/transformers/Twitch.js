import { URL } from 'url';

export const shouldTransform = url => {
  const { host } = new URL(url);

  return ['player.twitch.tv', 'www.twitch.tv', 'twitch.tv'].includes(host);
};

export const getHTML = url => {
  const iframeUrl = url
    .replace(/https?:\/\/(?:www.)?twitch.tv/g, 'https://player.twitch.tv')
    .replace(/twitch.tv\/(\w+)/g, 'twitch.tv/?channel=$1');

  return `<iframe src=${iframeUrl} height="600" width="400" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>`;
};
