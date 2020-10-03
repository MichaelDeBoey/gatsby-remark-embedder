import { fetchOEmbedData } from './utils';

const isMediaSubDomain = (host) => /^(media([0-9]+)?\.)giphy\.com$/.test(host);

export const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return (
    (['giphy.com', 'www.giphy.com'].includes(host) &&
      pathname.includes('/gifs/')) ||
    (isMediaSubDomain(host) && pathname.includes('/media/'))
  );
};

export const getGIPHYId = (url) => {
  const { host, pathname } = new URL(url);

  if (isMediaSubDomain(host)) {
    return pathname.split('/')[2];
  }

  return pathname.split('-').pop();
};

export const getGIPHYResponsivePadding = ({ height, width }) =>
  Math.round((height / width) * 100);

export const getHTML = (url) =>
  fetchOEmbedData(`https://giphy.com/services/oembed?url=${url}`).then(
    ({ height, width }) => {
      const GIPHYId = getGIPHYId(url);
      const padding = getGIPHYResponsivePadding({ height, width });

      return `<div style="width:100%;height:0;padding-bottom:${padding}%;position:relative;"><iframe src="https://giphy.com/embed/${GIPHYId}" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed" allowfullscreen></iframe></div>`;
    }
  );

export const name = 'GIPHY';
