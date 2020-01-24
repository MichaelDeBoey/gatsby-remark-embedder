import { URL } from 'url';

import { getTrimmedPathName, fetchOEmbedData } from './utils';

const isMediaSubDomain = host => /^(media([0-9]{1,})?\.)giphy\.com$/.test(host);

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  const trimmedPathName = getTrimmedPathName(pathname);

  return (
    (['www.giphy.com', 'giphy.com'].includes(host) &&
      trimmedPathName.includes('gifs/')) ||
    (isMediaSubDomain(host) && trimmedPathName.includes('media/'))
  );
};

export const getGiphyId = url => {
  const { host, pathname } = new URL(url);

  if (isMediaSubDomain(host)) {
    return pathname.split('/')[2];
  }

  return pathname.split('-').pop();
};

export const getGiphyResponsivePadding = (width, height) =>
  Math.floor((height * 100) / width);

export const getHTML = url => {
  const giphyId = getGiphyId(url);

  return fetchOEmbedData(`https://giphy.com/services/oembed?url=${url}`).then(
    ({ width, height }) => {
      const padding = getGiphyResponsivePadding(width, height);

      return `<div style="width:100%;height:0;padding-bottom:${padding}%;position:relative;"><iframe src="https://giphy.com/embed/${giphyId}" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/${giphyId}">via GIPHY</a></p>`;
    }
  );
};
