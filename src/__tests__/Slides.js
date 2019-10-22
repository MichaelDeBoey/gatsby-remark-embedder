import cases from 'jest-in-case';

import { getHTML, shouldTransform } from '../Slides';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Slides url': {
      url: 'https://not-a-slides-url.com',
      valid: false,
    },
    "non-Slides url ending with 'slides.com'": {
      url: 'https://this-is-not-slides.com',
      valid: false,
    },
    "non-Slides url ending with 'slides.com' and having '/embed/'": {
      url: 'https://this-is-not-slides.com/news/math/embed',
      valid: false,
    },
    'explore page': {
      url: 'https://slides.com/explore',
      valid: false,
    },
    'random page': {
      url: 'https://slides.com/random-page',
      valid: false,
    },
    'Slides embed url': {
      url: 'https://slides.com/news/math/embed',
      valid: false,
    },
    'Slides url (valid) with extra pathname': {
      url: 'https://slides.com/news/math/asdasd',
      valid: false,
    },
    'Slides embed url with trailing slash': {
      url: 'https://slides.com/news/math/embed/',
      valid: false,
    },
    'Slides homepage': {
      url: 'https://slides.com/',
      valid: false,
    },
    'Slides url': {
      url: 'https://slides.com/news/math',
      valid: true,
    },
    'Slides user slide': {
      url: 'https://slides.com/valentinogagliardi/django-rest#/1',
      valid: true,
    },
    'Slides url with trailing slash': {
      url: 'https://slides.com/news/math/',
      valid: true,
    },
    'Slide with slider number specified': {
      url:
        'https://slides.com/college/actualites-b2caeb9f-d64d-49ce-923d-fb3fc17613da#/0/2',
      valid: true,
    },
    'Slide with slider number specified 2': {
      url: 'https://slides.com/cassiecodes/deck-4-5#/3',
      valid: true,
    },
    "Slides url having 'www' subdomain": {
      url: 'https://www.slides.com/news/math',
      valid: true,
    },
  }
);

test('Gets the correct Slides iframe', () => {
  const html = getHTML('https://slides.com/news/math');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://slides.com/news/math/embed\\" width=\\"576\\" height=\\"420\\" scrolling=\\"no\\" frameborder=\\"0\\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"`
  );
});

test('Gets the correct Slides iframe with query params', () => {
  const html = getHTML('https://slides.com/cassiecodes/deck-4-5#/3');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://slides.com/cassiecodes/deck-4-5/embed#/3\\" width=\\"576\\" height=\\"420\\" scrolling=\\"no\\" frameborder=\\"0\\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"`
  );
});

test('Gets the correct Slides iframe with query params 2', () => {
  const html = getHTML(
    'https://slides.com/college/actualites-b2caeb9f-d64d-49ce-923d-fb3fc17613da#/0/2'
  );

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://slides.com/college/actualites-b2caeb9f-d64d-49ce-923d-fb3fc17613da/embed#/0/2\\" width=\\"576\\" height=\\"420\\" scrolling=\\"no\\" frameborder=\\"0\\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"`
  );
});
