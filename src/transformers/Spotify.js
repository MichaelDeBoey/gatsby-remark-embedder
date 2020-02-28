import { URL } from 'url';
import { includesSomeOfArray } from './utils';

export const serviceName = 'spotify';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    host === 'open.spotify.com' &&
    !includesSomeOfArray(pathname, ['embed', 'embed-podcast']) &&
    includesSomeOfArray(pathname, [
      '/album/',
      '/artist/',
      '/episode/',
      '/show/',
      '/track/',
      '/playlist/',
    ])
  );
};

export const getSpotifyIFrameSrc = urlString => {
  const { pathname } = new URL(urlString);
  const type = pathname.split('/')[1].toLowerCase();

  const podcastTypes = ['episode', 'show'];
  if (podcastTypes.includes(type)) {
    return urlString.replace(type, `embed-podcast/${type}`);
  }

  return urlString.replace(type, `embed/${type}`);
};

export const getHTML = url => {
  const iframeSrc = getSpotifyIFrameSrc(url);

  return `<iframe src="${iframeSrc}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
};
