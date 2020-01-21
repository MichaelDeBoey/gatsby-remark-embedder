const { URL } = require('url');

const includesSomeOfArray = (string, array) =>
  array.some(item => string.includes(item));

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    ['lichess.org', 'www.lichess.org'].includes(host) &&
    !includesSomeOfArray(pathname, [
      '/embed/',
      '/learn',
      '/practice',
      '/study',
      '/training',
      '/tv/',
    ]) &&
    !pathname.endsWith('/tv')
  );
};

export const getHTML = url => {
  const iframeUrl = url.replace('lichess.org', 'lichess.org/embed');

  return `<iframe src="${iframeUrl}" width="600" height="397" frameborder="0"></iframe>`;
};
