import { getTrimmedPathName } from './utils';

export const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);
  const trimmedPathName = getTrimmedPathName(pathname);

  return (
    ['testing-playground.com', 'www.testing-playground.com'].includes(host) &&
    (trimmedPathName.length === 0 || trimmedPathName.startsWith('gist/'))
  );
};

export const getTestingPlaygroundIFrameSrc = (urlString) => {
  const { pathname } = new URL(urlString);
  const path =
    pathname === '/' ? '/embed' : pathname.replace('/gist/', '/embed/');

  return `https://testing-playground.com${path}?panes=query,preview`;
};

export const getHTML = (url) => {
  const iframeSrc = getTestingPlaygroundIFrameSrc(url);

  return `<iframe src="${iframeSrc}" height="450" width="100%" scrolling="no" frameBorder="0" allowTransparency="true" style="overflow: hidden; display: block; width: 100%"></iframe>`;
};
