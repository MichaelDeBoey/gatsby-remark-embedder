import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  if (!['slides.com', 'www.slides.com', 'team.slides.com'].includes(host)) {
    return false;
  }

  const pathTrimmed = pathname.split('/').filter(Boolean);
  return pathTrimmed.length === 2;
};

export const getSlidesIFrameSrc = urlString => {
  const { host, pathname, hash } = new URL(urlString);
  // remove trailing slash
  const pathnameTrimmed = pathname.replace(/\/+$/, '');
  return `https://${host.replace(/w{3}\./, '')}${pathnameTrimmed}/embed${hash}`;
};

export const getHTML = url => {
  const iframeSrc = getSlidesIFrameSrc(url);

  return `<iframe src="${iframeSrc}" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
};
