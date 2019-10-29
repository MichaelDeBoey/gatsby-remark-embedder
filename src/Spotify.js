import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    host === 'open.spotify.com' &&
    (pathname.includes('/album/') ||
      pathname.includes('/artist/') ||
      pathname.includes('/episode/') ||
      pathname.includes('/show/') ||
      pathname.includes('/playlist/') ||
      pathname.includes('/track/'))
  );
};

export const getSpotifyIFrameSrc = urlString => {
  const { pathname } = new URL(urlString);
  const type = pathname.split('/')[1].toLowerCase();

  switch (type) {
    case 'album':
    case 'artist':
    case 'episode':
    case 'show':
    case 'track':
    case 'playlist':
      return urlString.replace(type, `embed/${type}`);
    default:
      return null;
  }
};

export const getHTML = url => {
  const iframeSrc = getSpotifyIFrameSrc(url);

  return `<iframe src="${iframeSrc}" style="width:100%; height:240px; border:0;" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
};
