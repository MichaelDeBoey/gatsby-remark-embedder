import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  /*
   possible RegEx:
   /^\/.*\w\/.*\w\/?[^embed].\/?$/
   /^\/.\w[^/]*\/.\w[^/]*#?.*\/?$/
   ^\/.*\w\/.*\w[^#/][^a-zA-Z0-9]?\/?$

   from twitter:
   (([\w-]+\.)*slides.com\/[\w-]{2,}\/[\w-]+)(\/\w+)?
  */
  if (pathname.includes('/embed')) return false;

  return (
    (host === 'slides.com' || host === 'www.slides.com') &&
    !!pathname.match(/^\/.*\w\/.*\w[^#/][^a-zA-Z0-9]?\/?$/gi)
  );
};

export const getHTML = url => {
  return `<iframe src="${url}/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
};
