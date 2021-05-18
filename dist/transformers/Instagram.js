"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = exports.getHTML = exports.shouldTransform = void 0;

var _utils = require("./utils");

const shouldTransform = url => {
  const {
    host,
    pathname
  } = new URL(url);
  return ['instagr.am', 'www.instagr.am', 'instagram.com', 'www.instagram.com'].includes(host) && pathname.includes('/p/');
};

exports.shouldTransform = shouldTransform;

const getHTML = (url, {
  accessToken
}) => (0, _utils.fetchOEmbedData)(`https://graph.facebook.com/v8.0/instagram_oembed?url=${url}&access_token=${accessToken}&omitscript=true`).then(({
  html
}) => html);

exports.getHTML = getHTML;
const name = 'Instagram';
exports.name = name;