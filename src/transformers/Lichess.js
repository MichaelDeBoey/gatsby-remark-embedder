const { URL } = require('url');

const includesSomeOfArray = (string, array) =>
  array.some(item => string.includes(item));

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    (host == 'lichess.org' || host == 'www.lichess.org') &&
    !includesSomeOfArray(pathname, [
      '/embed/',
      '/learn',
      '/practice',
      '/study',
      '/training',
      '/tv/',
    ]) &&
    !pathname.endsWith('/tv') // it is possible to have a game of URL: https://lichess.org/tv1342Jy
  );
};

export const getHTML = url => {
  const iframeUrl = url.replace('lichess.org', 'lichess.org/embed');

  return `<iframe src="${iframeUrl}" width="600" height="397" frameborder="0"></iframe>`;
};
