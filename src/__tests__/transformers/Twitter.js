import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../../';
import { getHTML, shouldTransform } from '../../transformers/Twitter';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

jest.mock('node-fetch', () => jest.fn());

const mockFetch = html =>
  fetchMock.mockResolvedValue({ json: () => Promise.resolve({ html }) });

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
    "non-Twitter url ending with 'twitter.com'": {
      url: 'https://this-is-not-twitter.com',
      valid: false,
    },
    "non-Twitter url ending with 'twitter.com' and having '/status/'": {
      url: 'https://this-is-not-twitter.com/foobar/status/123',
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
    "status url having 'www' subdomain": {
      url: 'https://www.twitter.com/foobar/status/123',
      valid: true,
    },
  }
);

test('Gets the correct Twitter iframe', async () => {
  mockFetch(
    `<blockquote class="twitter-tweet-mocked-fetch-transformer"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592?ref_src=twsrc%5Etfw">December 28, 2018</a></blockquote>`
  );

  const html = await getHTML(
    'https://twitter.com/kentcdodds/status/1078755736455278592'
  );

  expect(html).toMatchInlineSnapshot(
    `"<blockquote class=\\"twitter-tweet-mocked-fetch-transformer\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592\\">December 28, 2018</a></blockquote>"`
  );
});

test('Plugin can transform Twitter links', async () => {
  mockFetch(
    `<blockquote class="twitter-tweet-mocked-fetch-plugin"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592?ref_src=twsrc%5Etfw">December 28, 2018</a></blockquote>`
  );
  const markdownAST = getMarkdownASTForFile('Twitter');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<blockquote class=\\"twitter-tweet-mocked-fetch-plugin\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592\\">December 28, 2018</a></blockquote>
    "
  `);
});
