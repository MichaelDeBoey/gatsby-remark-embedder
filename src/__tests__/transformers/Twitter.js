import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../../';
import { getHTML, shouldTransform, buildUrl } from '../../transformers/Twitter';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

const { Response } = jest.requireActual('node-fetch');
jest.mock('node-fetch', () => jest.fn());

const mockFetch = (status, moment) =>
  fetchMock
    .mockResolvedValueOnce(new Response(JSON.stringify({ html: status })))
    .mockResolvedValueOnce(new Response(JSON.stringify({ html: status })))
    .mockResolvedValueOnce(new Response(JSON.stringify({ html: moment })))
    .mockResolvedValueOnce(new Response(JSON.stringify({ html: moment })))
    .mockResolvedValueOnce(new Response(JSON.stringify({ html: moment })))
    .mockResolvedValueOnce(new Response(JSON.stringify({ html: moment })));

beforeEach(() => {
  fetchMock.mockReset();
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
    'moment edit url': {
      url: 'https://twitter.com/i/moments/edit/994601867987619840',
      valid: false,
    },
    'status url': {
      url: 'https://twitter.com/kentcdodds/status/1078755736455278592',
      valid: true,
    },
    "status url having 'www' subdomain": {
      url: 'https://www.twitter.com/kentcdodds/status/1078755736455278592',
      valid: true,
    },
    'moment url': {
      url: 'https://twitter.com/i/moments/994601867987619840',
      valid: true,
    },
    "moment url having 'www' subdomain": {
      url: 'https://www.twitter.com/i/moments/994601867987619840',
      valid: true,
    },
    "moment url having '/events/' path": {
      url: 'https://twitter.com/i/events/994601867987619840',
      valid: true,
    },
    "moment url having 'www' subdomain & '/events/' path": {
      url: 'https://www.twitter.com/i/events/994601867987619840',
      valid: true,
    },
  }
);

test('Gets the correct Twitter status iframe', async () => {
  mockFetch(
    `<blockquote class="twitter-tweet-mocked-fetch-transformer"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592">December 28, 2018</a></blockquote>`
  );

  const html = await getHTML(
    'https://twitter.com/kentcdodds/status/1078755736455278592'
  );

  expect(html).toMatchInlineSnapshot(
    `"<blockquote class=\\"twitter-tweet-mocked-fetch-transformer\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592\\">December 28, 2018</a></blockquote>"`
  );
});

test('Gets the correct Twitter moment link', async () => {
  mockFetch(
    `<a class="twitter-moment-mocked-fetch-transformer" href="https://twitter.com/i/moments/994601867987619840">🔥 Design Tips</a>`
  );

  const html = await getHTML(
    'https://twitter.com/i/moments/994601867987619840'
  );

  expect(html).toMatchInlineSnapshot(
    `"<a class=\\"twitter-moment-mocked-fetch-transformer\\" href=\\"https://twitter.com/i/moments/994601867987619840\\">🔥 Design Tips</a>"`
  );
});

test('Applies plugin options to Twitter links correctly', () => {
  const options = {
    queryParams: {
      theme: 'dark',
      hide_media: true,
    },
  };
  const url = 'https://twitter.com/kentcdodds/status/1078755736455278592';
  expect(buildUrl(url, options)).toBe(
    'https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2Fkentcdodds%2Fstatus%2F1078755736455278592&dnt=true&omit_script=true&theme=dark&hide_media=true'
  );
});

test('Plugin can transform Twitter links', async () => {
  mockFetch(
    `<blockquote class="twitter-tweet-mocked-fetch-plugin"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592">December 28, 2018</a></blockquote>`,
    `<a class="twitter-moment-mocked-fetch-plugin" href="https://twitter.com/i/moments/994601867987619840">🔥 Design Tips</a>`
  );
  const markdownAST = getMarkdownASTForFile('Twitter');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-a-twitter-url.com>

    <https://this-is-not-twitter.com>

    <https://this-is-not-twitter.com/foobar/status/123>

    <https://twitter.com/MichaelDeBoey93>
    
    <https://twitter.com/i/moments/edit/994601867987619840>

    <blockquote class=\\"twitter-tweet-mocked-fetch-plugin\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592\\">December 28, 2018</a></blockquote>

    <blockquote class=\\"twitter-tweet-mocked-fetch-plugin\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592\\">December 28, 2018</a></blockquote>
    
    <a class=\\"twitter-moment-mocked-fetch-plugin\\" href=\\"https://twitter.com/i/moments/994601867987619840\\">🔥 Design Tips</a>

    <a class=\\"twitter-moment-mocked-fetch-plugin\\" href=\\"https://twitter.com/i/moments/994601867987619840\\">🔥 Design Tips</a>
    
    <a class=\\"twitter-moment-mocked-fetch-plugin\\" href=\\"https://twitter.com/i/moments/994601867987619840\\">🔥 Design Tips</a>
    
    <a class=\\"twitter-moment-mocked-fetch-plugin\\" href=\\"https://twitter.com/i/moments/994601867987619840\\">🔥 Design Tips</a>
    "
  `);
});

test('Applies plugin options to Twitter links correctly', () => {
  const options = {
    theme: 'dark',
    hide_media: true,
  };
  const url = 'https://twitter.com/kentcdodds/status/1078755736455278592';
  expect(buildUrl(url, options)).toBe(
    'https://publish.twitter.com/oembed?url=https%3A%2F%2Ftwitter.com%2Fkentcdodds%2Fstatus%2F1078755736455278592&dnt=true&omit_script=true&theme=dark&hide_media=true'
  );
});
