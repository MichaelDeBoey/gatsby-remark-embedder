import { URL } from 'url';

export const shouldTransform = string => {
  return new URL(string).host === 'soundcloud.com';
};

const getSoundcloudIFrameSrc = string => {
  return (
    `https://w.soundcloud.com/player/` +
    `?url=${encodeURIComponent(string)}` +
    `&color=%23ff5500` +
    `&auto_play=false` +
    `&hide_related=false` +
    `&show_comments=true` +
    `&show_user=true` +
    `&show_reposts=false` +
    `&show_teaser=true` +
    `&visual=true`
  );
};

export const getHTML = string => {
  const iframeUrl = getSoundcloudIFrameSrc(string);

  return (
    `<iframe` +
    ` width="100%"` +
    ` height="300"` +
    ` scrolling="no"` +
    ` frameborder="no"` +
    ` allow="autoplay"` +
    ` src=${iframeUrl}` +
    `></iframe>`
  );
};
