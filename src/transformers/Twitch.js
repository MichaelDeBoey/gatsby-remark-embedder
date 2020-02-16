import { URL } from 'url';
import { includesSomeOfArray } from './utils';

const ignoredPaths = ['/followers', '/settings', '/videos'];

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    [
      'player.twitch.tv',
      'www.twitch.tv',
      'twitch.tv',
      'clips.twitch.tv',
    ].includes(host) &&
    !includesSomeOfArray(pathname, ['followers', 'settings']) &&
    !pathname.endsWith('videos')
  );
};

export const getTwitchIFrameSrc = urlString => {
  const { href } = new URL(urlString);

  const location = href.match(/([^/=]*)\/*$/g)[0];

  if (urlString.match(/clip/g)) {
    return `https://clips.twitch.tv/embed?clip=${location}`;
  }

  if (urlString.match(/collection/g)) {
    return `https://player.twitch.tv?collection=${location}`;
  }

  if (urlString.match(/video/g)) {
    return `https://player.twitch.tv?video=${location}`;
  }

  return `https://player.twitch.tv?channel=${location}`;
};

export const getHTML = url => {
  const iframeUrl = getTwitchIFrameSrc(url);

  return `<iframe src="${iframeUrl}" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
};
