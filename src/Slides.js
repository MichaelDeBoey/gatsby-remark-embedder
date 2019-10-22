import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  if (!(host === 'slides.com' || host === 'www.slides.com')) return false;
  if (pathname.includes('/embed')) return false;

  const pathTrimmed = pathname.split('/').filter(Boolean);
  if (pathTrimmed.length !== 2) return false;
  return true;
};

export const getSlidesIFrameSrc = urlString => {
  const { origin, pathname, hash } = new URL(urlString);
  // remove trailing slash
  const pathnameTrimmed = pathname.replace(/\/+$/, '');

  return `${origin}${pathnameTrimmed}/embed${hash}`;
};

export const getHTML = url => {
  const iframeSrc = getSlidesIFrameSrc(url);

  return `<iframe src="${iframeSrc}" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
};
