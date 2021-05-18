"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHTML = exports.getSpotifyIFrameSrc = exports.shouldTransform = void 0;

var _utils = require("./utils");

const shouldTransform = url => {
  const {
    host,
    pathname
  } = new URL(url);
  return host === 'open.spotify.com' && !(0, _utils.includesSomeOfArray)(pathname, ['embed', 'embed-podcast']) && (0, _utils.includesSomeOfArray)(pathname, ['/album/', '/artist/', '/episode/', '/show/', '/track/', '/playlist/']);
};

exports.shouldTransform = shouldTransform;

const getSpotifyIFrameSrc = urlString => {
  const {
    pathname
  } = new URL(urlString);
  const type = pathname.split('/')[1].toLowerCase();

  if (['episode', 'show'].includes(type)) {
    return urlString.replace(type, `embed-podcast/${type}`);
  }

  return urlString.replace(type, `embed/${type}`);
};

exports.getSpotifyIFrameSrc = getSpotifyIFrameSrc;

const getHTML = url => {
  const iframeSrc = getSpotifyIFrameSrc(url);
  return `<iframe src="${iframeSrc}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
};

exports.getHTML = getHTML;