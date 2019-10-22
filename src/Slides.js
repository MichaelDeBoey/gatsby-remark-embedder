import { URL } from 'url';

const getTrimmedPathName = str => str.replace(/\/+$/, '');

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  if (!['slides.com', 'www.slides.com', 'team.slides.com'].includes(host)) {
    return false;
  }

  return (
    getTrimmedPathName(pathname)
      .split('/')
      .filter(Boolean).length === 2
  );
};

export const getSlidesIFrameSrc = urlString => {
  const { host, pathname, hash } = new URL(urlString);
  // remove trailing slash
  const pathnameTrimmed = getTrimmedPathName(pathname);
  return `https://${host.replace('www.', '')}${pathnameTrimmed}/embed${hash}`;
};

export const getHTML = url => {
  const iframeSrc = getSlidesIFrameSrc(url);

  return `<iframe src="${iframeSrc}" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
};
