import { URL } from 'url';

export const shouldTransform = string => new URL(string).host == 'codepen.io';

export const getHTML = string => {
  const iframeUrl = string.replace('/pen/', '/embed/');
  return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"></iframe>`;
};
