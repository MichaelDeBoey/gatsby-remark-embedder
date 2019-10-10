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
    'Pen embed url': {
      url: 'https://codepen.io/team/codepen/embed/PNaGbb',
      valid: true,
    },
    'Pen embed url with parameters': {
      url: 'https://codepen.io/team/codepen/embed/PNaGbb?default-tab=js',
      valid: true,
    },
    'Pen url': {
      url: 'https://codepen.io/team/codepen/pen/PNaGbb',
      valid: true,
    },
  }
);

test('Gets the correct CodePen iframe', () => {
  const html = getHTML('https://codepen.io/team/codepen/pen/PNaGbb');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://codepen.io/team/codepen/embed/preview/PNaGbb\\" style=\\"width:100%; height:300px;\\"></iframe>"`
  );
});
