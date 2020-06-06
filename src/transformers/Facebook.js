const he = require('he');

export const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return (
    ['facebook.com', 'www.facebook.com'].includes(host) &&
    pathname.includes('/videos/')
  );
};

export const getHTML = (string) => {
  const encoded = he.encode(string);
  const src = `https://www.facebook.com/plugin/video.php?href=${encoded}`;

  return `<iframe src="${src}" width="560" height="315" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allowFullScreen="true"></iframe>`;
};
