import { URL } from 'url';

import { getTrimmedPathName } from './utils';

const isPin = pathname => pathname.includes('pin/');
const isProfile = pathname => pathname.split('/').length === 1;
const isBoard = pathname => pathname.split('/').length === 2;

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  const trimmedPathName = getTrimmedPathName(pathname);

  return (
    ['pinterest.com', 'www.pinterest.com'].includes(host) &&
    (isPin(trimmedPathName) ||
      isProfile(trimmedPathName) ||
      isBoard(trimmedPathName))
  );
};

export const getHTML = url => {
  const { pathname } = new URL(url);
  const trimmedPathName = getTrimmedPathName(pathname);

  if (isPin(trimmedPathName)) {
    return `<a data-pin-do="embedPin" href="${url}"></a>`;
  }

  if (isBoard(trimmedPathName)) {
    return `<a data-pin-do="embedBoard" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="${url}"></a>`;
  }

  return `<a data-pin-do="embedUser" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="${url}"></a>`;
};
