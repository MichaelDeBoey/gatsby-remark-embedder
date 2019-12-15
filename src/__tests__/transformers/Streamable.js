import cases from 'jest-in-case';

import { getHTML, shouldTransform } from '../../transformers/Streamable';

jest.mock('node-fetch', () =>
  jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        html: `<iframe class="streamable-embed" src="https://streamable.com/o/bx960" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`.trim(),
      }),
  })
);

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
    'streamable-url-with-valid-embed-ending': {
      url: 'https://streamable.com/bx960',
      valid: true,
    },
    'streamable-url-with-s-valid-embed-ending': {
      url: 'https://streamable.com/s/bx960',
      valid: true,
    },
    'streamable-url-with-o-valid-embed-ending': {
      url: 'https://streamable.com/s/bx960',
      valid: true,
    },
    'streamable-url-with-long-embed-ending': {
      url: 'https://streamable.com/s/bx960/hcobuo',
      valid: true,
    },
  }
);

test('Builds the correct Streamable wrapper and iframe', async () => {
  const html = await getHTML('https://streamable.com/bx960');

  expect(html).toEqual(
    `<iframe class="streamable-embed" src="https://streamable.com/o/bx960" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`
  );
});
