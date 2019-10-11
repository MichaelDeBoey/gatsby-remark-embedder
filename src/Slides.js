import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  return (
    (host === 'slides.com' || host === 'www.slides.com') &&
    !!pathname.match(/^\/.*\w\/.*\w\/?[^embed].\/?$/gi)
  );
};

export const getHTML = url => {
  return `<iframe src="${url}/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
};
