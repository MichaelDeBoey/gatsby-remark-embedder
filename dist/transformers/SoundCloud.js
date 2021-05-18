"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHTML = exports.shouldTransform = void 0;

const shouldTransform = url => new URL(url).host === 'soundcloud.com';

exports.shouldTransform = shouldTransform;

const getSoundCloudIFrameSrc = url => `https://w.soundcloud.com/player?url=${url}&color=ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true`;

const getHTML = url => {
  const iframeUrl = getSoundCloudIFrameSrc(url);
  return `<iframe width="100%" height="300" scrolling="no" frameborder="no" src=${iframeUrl}></iframe>`;
};

exports.getHTML = getHTML;