import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import { getHTML, shouldTransform } from '../Twitter';

jest.mock('node-fetch', () =>
  jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        html: `
          <blockquote class="twitter-tweet"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592?ref_src=twsrc%5Etfw">December 28, 2018</a></blockquote>
        `.trim(),
      }),
  })
);

beforeEach(() => {
  fetchMock.mockClear();
});

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Twitter url': {
      url: 'https://not-a-twitter-url.com',
      valid: false,
    },
    'profile url': {
      url: 'https://twitter.com/MichaelDeBoey93',
      valid: false,
    },
    'status url': {
      url: 'https://twitter.com/foobar/status/123',
      valid: true,
    },
  }
);

test('calls twitter API for the url', async () => {
  const html = await getHTML(
    'https://twitter.com/kentcdodds/status/1078755736455278592'
  );

  expect(html).toMatchInlineSnapshot(
    `"<blockquote class=\\"twitter-tweet\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592\\">December 28, 2018</a></blockquote>"`
  );
});
