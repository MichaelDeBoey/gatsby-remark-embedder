import cases from 'jest-in-case';

import { getHTML, shouldTransform } from '../Streamable';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-streamable url': {
      url: 'https://no-streamable-url-here.com',
      valid: false,
    },
    'streamable-url-without-valid-embed-ending': {
      url: 'https://streamable.com/a/something',
      valid: false,
    },
    'streamable-url-with-valid-embed-ending': {
      url: 'https://streamable.com/s/something',
      valid: true,
    },
  }
);

test('Builds the correct Streamable wrapper and iframe', () => {
  const html = getHTML('https://streamable.com/s/bx960/hcobuo');

  expect(html).toMatchInlineSnapshot(`
    "<div
      height=\\"0\\"
      style=\\"position: relative;\\"
      width=\\"100%\\"
    >
      <iframe
        height=\\"100%\\"
        src=\\"https://streamable.com/s/bx960/hcobuo\\"
        style=\\"overflow: hidden; position: absolute;\\"
        width=\\"100%\\"
      >
      </iframe>
    </div>"
  `);
});
