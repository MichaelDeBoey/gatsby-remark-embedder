import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);

  /*
    INVALID:
    https://not-a-slides-url.com
    https://this-is-not-slides.com
    https://this-is-not-codepen.io/news/math/embed
    https://slides.com/explore
    https://slides.com/random-page
    https://slides.com/news/math/embed
    https://slides.com/news/math/asdasd
    https://slides.com/news/math/embed/
    https://slides.com/

    VALID:
    https://slides.com/news/math
    https://slides.com/news/math/
    https://www.slides.com/news/math
    https://slides.com/cassiecodes/deck-4-5#/3
    https://slides.com/valentinogagliardi/django-rest#/1
    https://slides.com/college/actualites-b2caeb9f-d64d-49ce-923d-fb3fc17613da#/0/2

  */

  if (!(host === 'slides.com' || host === 'www.slides.com')) return false;
  if (pathname.includes('/embed')) return false;

  const pathTrimmed = pathname.split('/').filter(Boolean);
  if (pathTrimmed.length !== 2) return false;
  return true;
};

export const getHTML = url => {
  return `<iframe src="${url}/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>`;
};
