"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHTML = exports.shouldTransform = void 0;

var _utils = require("./utils");

const isBoard = trimmedPathName => trimmedPathName.split('/').length === 2;

const isPin = trimmedPathName => trimmedPathName.includes('pin/');

const isProfile = trimmedPathName => trimmedPathName.split('/').length === 1;

const shouldTransform = url => {
  const {
    host,
    pathname
  } = new URL(url);
  const trimmedPathName = (0, _utils.getTrimmedPathName)(pathname);
  return ['pinterest.com', 'www.pinterest.com'].includes(host) && (isPin(trimmedPathName) || isBoard(trimmedPathName) || isProfile(trimmedPathName));
};

exports.shouldTransform = shouldTransform;

const getHTML = url => {
  const {
    pathname
  } = new URL(url);
  const trimmedPathName = (0, _utils.getTrimmedPathName)(pathname);

  if (isPin(trimmedPathName)) {
    return `<a data-pin-do="embedPin" href="${url}"></a>`;
  }

  if (isBoard(trimmedPathName)) {
    return `<a data-pin-do="embedBoard" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="${url}"></a>`;
  }

  return `<a data-pin-do="embedUser" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="${url}"></a>`;
};

exports.getHTML = getHTML;