import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return host.endsWith('codepen.io') && pathname.includes('/pen/');
};

export const getHTML = string => {
  const iframeUrl = string.replace('/pen/', '/embed/preview/');

  return `<iframe src="${iframeUrl}" style="width:100%; height:300px;"></iframe>`;
};
