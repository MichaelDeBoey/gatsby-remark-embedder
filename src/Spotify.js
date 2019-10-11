import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    host === 'open.spotify.com' &&
    (pathname.includes('/album/') || pathname.includes('/track/'))
  );
};

export const getHTML = url => {
  const isTrack = url.includes('/track/');

  const replaceKey = isTrack ? '/track/' : '/album/';
  const iframeUrl = url.replace(replaceKey, `/embed${replaceKey}`);
  return `<iframe src="${iframeUrl}" style="width:100%; height:${
    isTrack ? '80px' : '400px'
  }; border:0;" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
};
