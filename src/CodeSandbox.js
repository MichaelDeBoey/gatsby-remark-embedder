import { URL } from 'url';

export const shouldTransform = url => new URL(url).host === 'codesandbox.io';

export const getHTML = url => {
  const iframeUrl = url.replace('/s/', '/embed/');

  return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"></iframe>`;
};
