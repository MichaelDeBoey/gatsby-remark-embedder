import cases from 'jest-in-case';

import { getHTML, getSlidesIFrameSrc, shouldTransform } from '../Slides';

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
    "non-Slides url ending with 'slides.com' and having a username and deck-name": {
      url: 'https://this-is-not-slides.com/kentcdodds/oss-we-want',
      valid: false,
    },
    homepage: {
      url: 'https://slides.com',
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
    'team embed url': {
      url: 'https://team.slides.com/hakimel/finch/embed',
      valid: false,
    },
    'team fullscreen url': {
      url: 'https://team.slides.com/hakimel/finch/fullscreen',
      valid: false,
    },
    'team live url': {
      url: 'https://team.slides.com/hakimel/finch/live',
      valid: false,
    },
    'team Deck url with custom dotted team subdomain': {
      url: 'https://dotted.team.slides.com/username/deck-name',
      valid: false,
    },
    'team Deck url with custom team subdomain of 1 character': {
      url: 'https://a.slides.com/username/deck-name',
      valid: false,
    },
    'user embed url': {
      url: 'https://slides.com/kentcdodds/oss-we-want/embed',
      valid: false,
    },
    'user fullscreen url': {
      url: 'https://slides.com/kentcdodds/oss-we-want/fullscreen',
      valid: false,
    },
    'user live url': {
      url: 'https://slides.com/kentcdodds/oss-we-want/live',
      valid: false,
    },
    'team Deck url': {
      url: 'https://team.slides.com/hakimel/finch',
      valid: true,
    },
    'team Deck url with custom team subdomain': {
      url: 'https://acme.slides.com/jack-k/sales-template',
      valid: true,
    },
    'team Deck url with custom hyphened team subdomain': {
      url: 'https://team-name.slides.com/username/deck-name',
      valid: true,
    },
    'team Deck url with custom underscored team subdomain': {
      url: 'https://team_name.slides.com/username/deck-name',
      valid: true,
    },
    'team Deck url with custom alphanumeric team subdomain': {
      url: 'https://asdfdsa11232889ASD.slides.com/username/deck-name',
      valid: true,
    },
    'team Deck url with custom team subdomain of 2 characters': {
      url: 'https://ab.slides.com/username/deck-name',
      valid: true,
    },
    'team Deck url with selected page': {
      url: 'https://team.slides.com/hakimel/finch#/0',
      valid: true,
    },
    'team Deck url with selected page & extra slashes': {
      url: 'https://team.slides.com/hakimel/finch/////#/0',
      valid: true,
    },
    "team Deck url having 'embed' as name": {
      url: 'https://team.slides.com/username/embed',
      valid: true,
    },
    "team Deck url having 'fullscreen' as name": {
      url: 'https://team.slides.com/username/fullscreen',
      valid: true,
    },
    "team Deck url having 'live' as name": {
      url: 'https://team.slides.com/username/live',
      valid: true,
    },
    'user Deck url': {
      url: 'https://slides.com/kentcdodds/oss-we-want',
      valid: true,
    },
    "user Deck url having 'www' subdomain": {
      url: 'https://www.slides.com/kentcdodds/oss-we-want',
      valid: true,
    },
    "user Deck url having 'embed' as name": {
      url: 'https://slides.com/michaeldeboey/embed',
      valid: true,
    },
    "user Deck url having 'fullscreen' as name": {
      url: 'https://slides.com/michaeldeboey/fullscreen',
      valid: true,
    },
    "user Deck url having 'live' as name": {
      url: 'https://slides.com/michaeldeboey/live',
      valid: true,
    },
    'user Deck url with selected page': {
      url: 'https://slides.com/kentcdodds/oss-we-want#/0',
      valid: true,
    },
    'user Deck url with selected page & extra slashes': {
      url: 'https://slides.com/kentcdodds/oss-we-want/////#/0',
      valid: true,
    },
  }
);

cases(
  'get Slides iframe url',
  ({ iframe, url }) => {
    expect(getSlidesIFrameSrc(url)).toBe(iframe);
  },
  {
    'team Deck url': {
      url: 'https://team.slides.com/hakimel/finch',
      iframe: 'https://team.slides.com/hakimel/finch/embed',
    },
    'team Deck url with selected page': {
      url: 'https://team.slides.com/hakimel/finch#/0',
      iframe: 'https://team.slides.com/hakimel/finch/embed#/0',
    },
    'team Deck url with selected page & extra slashes': {
      url: 'https://team.slides.com/hakimel/finch/////#/0',
      iframe: 'https://team.slides.com/hakimel/finch/embed#/0',
    },
    "team Deck url having 'embed' as name": {
      url: 'https://team.slides.com/teamname/embed',
      iframe: 'https://team.slides.com/teamname/embed/embed',
    },
    "team Deck url having 'fullscreen' as name": {
      url: 'https://team.slides.com/teamname/fullscreen',
      iframe: 'https://team.slides.com/teamname/fullscreen/embed',
    },
    "team Deck url having 'live' as name": {
      url: 'https://team.slides.com/teamname/live',
      iframe: 'https://team.slides.com/teamname/live/embed',
    },
    'user Deck url': {
      url: 'https://slides.com/kentcdodds/oss-we-want',
      iframe: 'https://slides.com/kentcdodds/oss-we-want/embed',
    },
    "user Deck url having 'www' subdomain": {
      url: 'https://www.slides.com/kentcdodds/oss-we-want',
      iframe: 'https://slides.com/kentcdodds/oss-we-want/embed',
    },
    "user Deck url having 'embed' as name": {
      url: 'https://slides.com/michaeldeboey/embed',
      iframe: 'https://slides.com/michaeldeboey/embed/embed',
    },
    "user Deck url having 'fullscreen' as name": {
      url: 'https://slides.com/michaeldeboey/fullscreen',
      iframe: 'https://slides.com/michaeldeboey/fullscreen/embed',
    },
    "user Deck url having 'live' as name": {
      url: 'https://slides.com/michaeldeboey/live',
      iframe: 'https://slides.com/michaeldeboey/live/embed',
    },
    'user Deck url with selected page': {
      url: 'https://slides.com/kentcdodds/oss-we-want#/0',
      iframe: 'https://slides.com/kentcdodds/oss-we-want/embed#/0',
    },
    'user Deck url with selected page & extra slashes': {
      url: 'https://slides.com/kentcdodds/oss-we-want/////#/0',
      iframe: 'https://slides.com/kentcdodds/oss-we-want/embed#/0',
    },
  }
);

test('Gets the correct Slides iframe', () => {
  const html = getHTML('https://slides.com/kentcdodds/oss-we-want');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://slides.com/kentcdodds/oss-we-want/embed\\" width=\\"576\\" height=\\"420\\" scrolling=\\"no\\" frameborder=\\"0\\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"`
  );
});
