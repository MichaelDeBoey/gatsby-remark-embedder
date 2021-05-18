"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHTML = exports.shouldTransform = void 0;

var _utils = require("./utils");

const shouldTransform = url => {
  const {
    host,
    pathname
  } = new URL(url);
  return ['lichess.org', 'www.lichess.org'].includes(host) && !(0, _utils.includesSomeOfArray)(pathname, ['/embed/', '/learn', '/practice', '/study', '/training', '/tv/']) && !pathname.endsWith('/tv');
};

exports.shouldTransform = shouldTransform;

const getHTML = url => {
  const iframeUrl = url.replace('lichess.org', 'lichess.org/embed');
  return `<iframe src="${iframeUrl}" width="600" height="397" frameborder="0"></iframe>`;
};

exports.getHTML = getHTML;