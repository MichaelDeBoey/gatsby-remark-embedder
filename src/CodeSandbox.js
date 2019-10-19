import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    (host === 'codesandbox.io' || host === 'www.codesandbox.io') &&
    pathname.includes('/s/')
  );
};

export const getHTML = url => {
  const iframeUrl = url.replace('/s/', '/embed/');

  return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`;
};
