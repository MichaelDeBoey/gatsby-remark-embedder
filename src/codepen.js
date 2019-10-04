import { URL } from 'url';

export const shouldTransform = string => {
  return new URL(string).host == 'codepen.io';
};

export const getHTML = string => {
  return `<iframe src="${string}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"></iframe>`;
};
