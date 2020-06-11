import { getTrimmedPathName } from './utils';

export const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);
  const trimmedPathName = getTrimmedPathName(pathname).split('/');

  return (
    ['egghead.io', 'www.egghead.io'].includes(host) &&
    pathname.includes('/lessons/') &&
    trimmedPathName.length > 1
  );
};

export const getHTML = (url) => {
  return `<iframe src="${url}/embed" width="100%" allowFullScreen></iframe>`;
};
