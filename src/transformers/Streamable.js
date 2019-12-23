import { URL } from 'url';
import fetch from 'node-fetch';

const getTrimmedPathName = pathname => pathname.replace(/^\/|\/+$/g, '');

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  const trimmedPathName = getTrimmedPathName(pathname).split('/');

  return (
    (['streamable.com', 'www.streamable.com'].includes(host) &&
      trimmedPathName.length === 1 &&
      !['documentation', 'login', 'recover', 'settings', 'signup'].includes(
        trimmedPathName[0]
      )) ||
    (trimmedPathName.length > 1 &&
      trimmedPathName.length <= 3 &&
      ['e', 'g', 'o', 's', 't'].includes(trimmedPathName[0]))
  );
};

export const getHTML = url =>
  fetch(`https://api.streamable.com/oembed.json?url=${url}`)
    .then(({ json }) => json())
    .then(({ html }) => html);
