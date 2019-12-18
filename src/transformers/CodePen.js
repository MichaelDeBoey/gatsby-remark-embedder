import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    ['codepen.io', 'www.codepen.io'].includes(host) &&
    pathname.includes('/pen/')
  );
};

export const getHTML = url => {
  const iframeUrl = url.replace('/pen/', '/embed/preview/');

  return `<iframe src="${iframeUrl}" style="width:100%; height:300px;"></iframe>`;
};
