import { URL } from 'url';

export const isValid = url => {
  const { pathname } = new URL(url);
  const pathnameParts = pathname.split('/');

  if (url.match('embed') || pathnameParts[2] === 'videos') {
    return false;
  }

  if (url.match(/collection|video|channel|channel|clip/g)) {
    return true;
  }

  if (pathnameParts.length == 2 && pathnameParts[1]) {
    return true;
  }

  return false;
};

export const shouldTransform = url => {
  const { host } = new URL(url);

  return (
    [
      'player.twitch.tv',
      'www.twitch.tv',
      'twitch.tv',
      'clips.twitch.tv',
    ].includes(host) && isValid(url)
  );
};

export const getTwitchIFrameSrc = urlString => {
  const { href } = new URL(urlString);

  const location = href.match(/([^/=]*)\/*$/g)[0];
  const urlType = urlString.match(/collection|video|clip/);

  if (urlType === null) {
    return `https://player.twitch.tv?channel=${location}`;
  }

  if (urlType[0] === 'clip') {
    return `https://clips.twitch.tv/embed?clip=${location}`;
  }

  return `https://player.twitch.tv?${urlType[0]}=${location}`;
};

export const getHTML = url => {
  const iframeUrl = getTwitchIFrameSrc(url);

  return `<iframe src="${iframeUrl}" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
};
