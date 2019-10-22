import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  if (!(host === 'slides.com' || host === 'www.slides.com')) return false;
  if (pathname.includes('/embed')) return false;

  const pathTrimmed = pathname.split('/').filter(Boolean);
  if (pathTrimmed.length !== 2) return false;
  return true;
};

export const getHTML = url => {
  const _url = new URL(url);
  return `<iframe src="${_url.origin}${_url.pathname}/embed${_url.hash}" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
};
