import { URL } from 'url';

const getTrimmedPathName = pathname =>
  // Trim leading and trailing slashes
  pathname.replace(/^\/|\/+$/g, '');

const isSubDomain = host => /^([a-zA-Z0-9-_]{2,}\.)?slides\.com$/.test(host);

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    isSubDomain(host) && getTrimmedPathName(pathname).split('/').length === 2
  );
};

export const getSlidesIFrameSrc = urlString => {
  const { host, pathname, hash } = new URL(urlString);
  const trimmedHost = host.replace('www.', '');
  const trimmedPathName = getTrimmedPathName(pathname);

  return `https://${trimmedHost}/${trimmedPathName}/embed${hash}`;
};

export const getHTML = url => {
  const iframeSrc = getSlidesIFrameSrc(url);

  return `<iframe src="${iframeSrc}" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
};
