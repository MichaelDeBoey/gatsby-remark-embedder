import { URL } from 'url';

export const shouldTransform = url => new URL(url).host === 'soundcloud.com';

const getSoundCloudIFrameSrc = url =>
  `https://w.soundcloud.com/player?url=${url}&color=ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

export const getHTML = url => {
  const iframeUrl = getSoundCloudIFrameSrc(url);

  return `<iframe width="100%" height="300" scrolling="no" frameborder="no" src=${iframeUrl}></iframe>`;
};
