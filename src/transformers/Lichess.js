const { URL } = require('url');

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    ['lichess.org', 'www.lichess.org'].includes(host) &&
    !pathname.includes('/embed/') &&
    !pathname.includes('/study/') &&
    !pathname.includes('/training/') &&
    !pathname.includes('/tv/')
  );
};

export const getHTML = url => {
  const iframeUrl = url.replace('lichess.org', 'lichess.org/embed');

  return `<iframe src="${iframeUrl}" width="600" height="397" frameborder="0"></iframe>`;
};
