"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHTML = exports.shouldTransform = void 0;

const shouldTransform = url => {
  const {
    host,
    pathname
  } = new URL(url);
  return ['codesandbox.io', 'www.codesandbox.io'].includes(host) && pathname.includes('/s/');
};

exports.shouldTransform = shouldTransform;

const getHTML = url => {
  const iframeUrl = url.replace('/s/', '/embed/');
  return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`;
};

exports.getHTML = getHTML;