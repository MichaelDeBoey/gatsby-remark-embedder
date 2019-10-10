import { URL } from 'url';

export const shouldTransform = url => {
  const urlObj = new URL(url);
  if (urlObj.host === 'codepen.io') {
    return !!urlObj.pathname.match(/\/pen\/.*\w/);
  }
  return false;
};

export const getHTML = string => {
  const iframeUrl = string.replace('/pen/', '/embed/preview/');

  return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"></iframe>`;
};
