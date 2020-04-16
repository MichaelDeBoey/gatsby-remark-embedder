import { getTrimmedPathName } from './utils';

export const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return (
    ['egghead.io', 'www.egghead.io'].includes(host) &&
    pathname.includes('/lessons/')
  );
};

export const getHTML = (url) =>
  `<iframe src="${url}/embed" width="100%" allowFullScreen></iframe>`;
