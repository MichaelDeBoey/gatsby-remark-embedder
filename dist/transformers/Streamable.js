"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHTML = exports.getNormalizedStreamableUrl = exports.shouldTransform = void 0;

var _utils = require("./utils");

const ignoredPaths = ['/documentation', '/login', '/recover', '/settings', '/signup'];
const possibleCachePaths = ['e', 'g', 'o', 's', 't'];

const shouldTransform = url => {
  const {
    host,
    pathname
  } = new URL(url);
  const trimmedPathName = (0, _utils.getTrimmedPathName)(pathname).split('/');
  return ['streamable.com', 'www.streamable.com'].includes(host) && trimmedPathName.length > 0 && trimmedPathName.length <= 3 && (trimmedPathName.length === 1 && !ignoredPaths.includes(pathname) || possibleCachePaths.includes(trimmedPathName[0]));
};

exports.shouldTransform = shouldTransform;

const getNormalizedStreamableUrl = url => {
  const {
    pathname
  } = new URL(url);
  const trimmedPathName = (0, _utils.getTrimmedPathName)(pathname).split('/');

  if (trimmedPathName.length === 1) {
    return url;
  }

  return `https://streamable.com/${trimmedPathName[1]}`;
};

exports.getNormalizedStreamableUrl = getNormalizedStreamableUrl;

const getHTML = url => {
  const normalizedUrl = getNormalizedStreamableUrl(url);
  return (0, _utils.fetchOEmbedData)(`https://api.streamable.com/oembed.json?url=${normalizedUrl}`).then(({
    html
  }) => html);
};

exports.getHTML = getHTML;