import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../../';
import {
  getHTML,
  getNormalizedStreamableUrl,
  shouldTransform,
} from '../../transformers/Streamable';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

jest.mock('node-fetch', () => jest.fn());

const mockFetch = html =>
  fetchMock.mockResolvedValue({ json: () => Promise.resolve({ html }) });

beforeEach(() => {
  fetchMock.mockClear();
});

cases(
  'normalized streamable path validation',
  ({ url, normalizedUrl }) => {
    expect(getNormalizedStreamableUrl(url)).toBe(normalizedUrl);
  },
  {
    'basic short url': {
      url: 'https://streamable.com/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    'basic e url': {
      url: 'https://streamable.com/e/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    'e url with username': {
      url: 'https://streamable.com/e/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
    'basic g url': {
      url: 'https://streamable.com/g/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    'g url with username': {
      url: 'https://streamable.com/g/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
    'basic o url': {
      url: 'https://streamable.com/o/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    'o url with username': {
      url: 'https://streamable.com/o/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
    'basic s url': {
      url: 'https://streamable.com/s/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    's url with username': {
      url: 'https://streamable.com/s/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
    'basic t url': {
      url: 'https://streamable.com/t/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    't url with username': {
      url: 'https://streamable.com/t/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
  }
);

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Streamable url': {
      url: 'https://not-a-streamable-url.com',
      valid: false,
    },
    "non-Streamable url ending with 'streamable.com'": {
      url: 'https://this-is-not-streamable.com',
      valid: false,
    },
    'documentation page': {
      url: 'https://streamable.com/documentation',
      valid: false,
    },
    'login page': {
      url: 'https://streamable.com/login',
      valid: false,
    },
    'recover page': {
      url: 'https://streamable.com/recover',
      valid: false,
    },
    'settings page': {
      url: 'https://streamable.com/settings',
      valid: false,
    },
    'signup page': {
      url: 'https://streamable.com/signup',
      valid: false,
    },
    "video url having '/e/' path & username & extra path": {
      url: 'https://streamable.com/e/moo/username/extra',
      valid: false,
    },
    "video url having '/g/' path & username & extra path": {
      url: 'https://streamable.com/g/moo/username/extra',
      valid: false,
    },
    "video url having '/o/' path & username & extra path": {
      url: 'https://streamable.com/o/moo/username/extra',
      valid: false,
    },
    "video url having '/s/' path & username & extra path": {
      url: 'https://streamable.com/s/moo/username/extra',
      valid: false,
    },
    "video url having '/t/' path & username & extra path": {
      url: 'https://streamable.com/t/moo/username/extra',
      valid: false,
    },
    'video url': {
      url: 'https://streamable.com/moo',
      valid: true,
    },
    "video url having '/e/' path": {
      url: 'https://streamable.com/e/moo',
      valid: true,
    },
    "video url having '/e/' path & username": {
      url: 'https://streamable.com/e/moo/username',
      valid: true,
    },
    "video url having '/g/' path": {
      url: 'https://streamable.com/g/moo',
      valid: true,
    },
    "video url having '/g/' path & username": {
      url: 'https://streamable.com/g/moo/username',
      valid: true,
    },
    "video url having '/o/' path": {
      url: 'https://streamable.com/o/moo',
      valid: true,
    },
    "video url having '/o/' path & username": {
      url: 'https://streamable.com/o/moo/username',
      valid: true,
    },
    "video url having '/s/' path": {
      url: 'https://streamable.com/s/moo',
      valid: true,
    },
    "video url having '/s/' path & username": {
      url: 'https://streamable.com/s/moo/username',
      valid: true,
    },
    "video url having '/t/' path": {
      url: 'https://streamable.com/t/moo',
      valid: true,
    },
    "video url having '/t/' path & username": {
      url: 'https://streamable.com/t/moo/username',
      valid: true,
    },
  }
);

test('Gets the correct Streamable iframe', async () => {
  mockFetch(
    `<iframe class="streamable-embed-mocked-fetch-transformer" src="https://streamable.com/o/bx960" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`
  );
  const html = await getHTML('https://streamable.com/bx960');

  expect(html).toMatchInlineSnapshot(
    `"<iframe class=\\"streamable-embed-mocked-fetch-transformer\\" src=\\"https://streamable.com/o/bx960\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>"`
  );
});

test('Plugin correctly transforms Streamable links', async () => {
  mockFetch(
    `<iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`
  );
  const markdownAST = getMarkdownASTForFile('Streamable');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-a-streamable-url.com>

    <https://this-is-not-streamable.com>

    <https://streamable.com/documentation>

    <https://streamable.com/login>

    <https://streamable.com/recover>

    <https://streamable.com/settings>

    <https://streamable.com/signup>

    <https://streamable.com/e/moo/username/extra>

    <https://streamable.com/g/moo/username/extra>

    <https://streamable.com/o/moo/username/extra>

    <https://streamable.com/s/moo/username/extra>

    <https://streamable.com/t/moo/username/extra>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"streamable-embed-mocked-fetch-plugin\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>
    "
  `);
});
