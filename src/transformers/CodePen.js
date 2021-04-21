export const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return (
    ['codepen.io', 'www.codepen.io'].includes(host) &&
    pathname.includes('/pen/')
  );
};

export const getHTML = (url, { width = '100%', height = '300px' }) => {
  const iframeUrl = url.replace('/pen/', '/embed/preview/');

  return `<iframe src="${iframeUrl}" style="width:${width}; height:${height};"></iframe>`;
};
