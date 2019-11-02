import { URL } from 'url';

const podcastTypes = [
  'album',
  'artist',
  'episode',
  'show',
  'track',
  'playlist',
];

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  const pathnameFields = pathname.split('/');
  const type =
      (pathnameFields && pathnameFields[1] && pathnameFields[1].toLowerCase()) ||
      null;
  return host === 'open.spotify.com' && podcastTypes.includes(type);
};

export const getSpotifyIFrameSrc = urlString => {
  const { pathname } = new URL(urlString);
  const type = pathname.split('/')[1].toLowerCase();

  return (
      podcastTypes.includes(type) && urlString.replace(type, `embed/${type}`)
  );
};

export const getHTML = url => {
  const iframeSrc = getSpotifyIFrameSrc(url);

  return `<iframe src="${iframeSrc}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
};
