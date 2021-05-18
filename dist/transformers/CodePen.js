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
  return ['codepen.io', 'www.codepen.io'].includes(host) && pathname.includes('/pen/');
};

exports.shouldTransform = shouldTransform;

const getHTML = url => {
  const iframeUrl = url.replace('/pen/', '/embed/preview/');
  return `<iframe src="${iframeUrl}" style="width:100%; height:300px;"></iframe>`;
};

exports.getHTML = getHTML;