import { URL } from 'url';

export const shouldTransform = url => {
  const { host } = new URL(url);

  return ['player.twitch.tv', 'www.twitch.tv', 'twitch.tv'].includes(host);
};

export const getTwitchIFrameSrc = urlString =>
  urlString
    .replace(/https?:\/\/(?:www.)?twitch.tv/g, 'https://player.twitch.tv')
    .replace(/twitch.tv\/(\w+)/g, 'twitch.tv/?channel=$1');

export const getHTML = url => {
  const iframeUrl = getTwitchIFrameSrc(url);

  return `<iframe src=${iframeUrl} height="600" width="400" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>`;
};
