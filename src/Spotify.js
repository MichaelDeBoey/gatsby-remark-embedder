import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    (host === 'open.spotify.com' || host === 'www.open.spotify.com') &&
    pathname.includes('/album/')
  );
};

export const getHTML = url => {
  const iframeUrl = url.replace('/album/', '/embed/album/');
  return `<iframe src="${iframeUrl}" style="width:100%; height:400px; border:0;" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
};
