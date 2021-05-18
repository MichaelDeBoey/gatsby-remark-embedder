"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHTML = exports.getSlidesIFrameSrc = exports.shouldTransform = void 0;

var _utils = require("./utils");

const isSubDomain = host => /^([a-zA-Z0-9-_]{2,}\.)?slides\.com$/.test(host);

const shouldTransform = url => {
  const {
    host,
    pathname
  } = new URL(url);
  return isSubDomain(host) && (0, _utils.getTrimmedPathName)(pathname).split('/').length === 2;
};

exports.shouldTransform = shouldTransform;

const getSlidesIFrameSrc = urlString => {
  const {
    host,
    pathname,
    hash
  } = new URL(urlString);
  const trimmedHost = host.replace('www.', '');
  const trimmedPathName = (0, _utils.getTrimmedPathName)(pathname);
  return `https://${trimmedHost}/${trimmedPathName}/embed${hash}`;
};

exports.getSlidesIFrameSrc = getSlidesIFrameSrc;

const getHTML = url => {
  const iframeSrc = getSlidesIFrameSrc(url);
  return `<iframe src="${iframeSrc}" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
};

exports.getHTML = getHTML;