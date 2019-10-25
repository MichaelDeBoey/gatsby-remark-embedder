import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    ['codesandbox.io', 'www.codesandbox.io'].includes(host) &&
    pathname.includes('/s/')
  );
};

export const getHTML = url => {
  const iframeUrl = url.replace('/s/', '/embed/');

  return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`;
};
