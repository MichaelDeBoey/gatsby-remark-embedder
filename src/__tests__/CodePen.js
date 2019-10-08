import cases from 'jest-in-case';
import { getHTML, shouldTransform } from '../CodePen';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'direct url': {
      url: 'https://codepen.io/team/codepen/pen/PNaGbb',
      valid: true,
    },
    'embed url': {
      url: 'https://codepen.io/team/codepen/embed/PNaGbb',
      valid: true,
    },
    'url with parameters': {
      url: 'https://codepen.io/team/codepen/embed/PNaGbb?default-tab=js',
      valid: true,
    },
    'not a codepen url': {
      url: 'https://not-a-codepen-url.com',
      valid: false,
    },
  }
);

test('Gets the correct Codepen iframe', () => {
  const html = getHTML('https://codepen.io/team/codepen/pen/PNaGbb');
  expect(html).toBe(
    `<iframe src="https://codepen.io/team/codepen/embed/PNaGbb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"></iframe>`
  );
});
