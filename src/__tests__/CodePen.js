import cases from 'jest-in-case';

import { getHTML, shouldTransform } from '../CodePen';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-CodePen url': {
      url: 'https://not-a-codepen-url.com',
      valid: false,
    },
    "non-CodePen url with '/embed/'": {
      url: 'https://not-a-codepen-url.com/user/embed/123456',
      valid: false,
    },
    "non-CodePen url with '/pen/'": {
      url: 'https://not-a-codepen-url.com/user/pen/123456',
      valid: false,
    },
    'CodePen team page': {
      url: 'https://codepen.io/team/codepen',
      valid: false,
    },
    'CodePen user page': {
      url: 'https://codepen.io/MichaelDeBoey',
      valid: false,
    },
    'random CodePen page': {
      url: 'https://codepen.io/random-page',
      valid: false,
    },
    'CodePen blog': {
      url: 'https://blog.codepen.io',
      valid: false,
    },
    "CodePen blog with '/embed/'": {
      url: 'https://blog.codepen.io/user/embed/123456',
      valid: false,
    },
    "CodePen blog with '/pen/'": {
      url: 'https://blog.codepen.io/user/pen/123456',
      valid: false,
    },
    'Pen embed url': {
      url: 'https://codepen.io/team/codepen/embed/PNaGbb',
      valid: false,
    },
    'Pen embed url with parameters': {
      url: 'https://codepen.io/team/codepen/embed/PNaGbb?default-tab=js',
      valid: false,
    },
    'Team Pen url': {
      url: 'https://codepen.io/team/codepen/pen/PNaGbb',
      valid: true,
    },
    'User Pen url': {
      url: 'https://codepen.io/chriscoyier/pen/owBwKM',
      valid: true,
    },
  }
);

test('Gets the correct CodePen iframe', () => {
  const html = getHTML('https://codepen.io/team/codepen/pen/PNaGbb');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://codepen.io/team/codepen/embed/preview/PNaGbb\\" style=\\"width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;\\"></iframe>"`
  );
});
