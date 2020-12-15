import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../../';
import {
  getHTML,
  getNormalizedStreamableUrl,
  shouldTransform,
} from '../../transformers/Streamable';

import { cache, getMarkdownASTForFile, mdastToHtml } from '../helpers';

const { Response } = jest.requireActual('node-fetch');
jest.mock('node-fetch', () => jest.fn());

const mockFetch = (html) =>
  fetchMock.mockImplementation(() =>
    Promise.resolve(new Response(JSON.stringify({ html })))
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

cases(
  'getNormalizedStreamableUrl',
  ({ url, normalizedUrl }) => {
    expect(getNormalizedStreamableUrl(url)).toBe(normalizedUrl);
  },
  {
    'video url': {
      url: 'https://streamable.com/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/e/' path": {
      url: 'https://streamable.com/e/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/e/' path & username": {
      url: 'https://streamable.com/e/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/g/' path": {
      url: 'https://streamable.com/g/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/g/' path & username": {
      url: 'https://streamable.com/g/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/o/' path": {
      url: 'https://streamable.com/o/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/o/' path & username": {
      url: 'https://streamable.com/o/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/s/' path": {
      url: 'https://streamable.com/s/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/s/' path & username": {
      url: 'https://streamable.com/s/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/t/' path": {
      url: 'https://streamable.com/t/moo',
      normalizedUrl: 'https://streamable.com/moo',
    },
    "video url having '/t/' path & username": {
      url: 'https://streamable.com/t/moo/username',
      normalizedUrl: 'https://streamable.com/moo',
    },
  }
);

test('Gets the correct Streamable iframe', async () => {
  mockFetch(
    `<iframe class="streamable-embed-mocked-fetch-transformer" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`
  );
  const html = await getHTML('https://streamable.com/moo');

  expect(html).toMatchInlineSnapshot(
    `<iframe class="streamable-embed-mocked-fetch-transformer" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`
  );
});

test('Plugin correctly transforms Streamable links', async () => {
  mockFetch(
    `<iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`
  );
  const markdownAST = getMarkdownASTForFile('Streamable');

  const processedAST = await plugin({ cache, markdownAST });

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://not-a-streamable-url.com</p>
    <p>https://this-is-not-streamable.com</p>
    <p>https://streamable.com/documentation</p>
    <p>https://streamable.com/login</p>
    <p>https://streamable.com/recover</p>
    <p>https://streamable.com/settings</p>
    <p>https://streamable.com/signup</p>
    <p>https://streamable.com/e/moo/username/extra</p>
    <p>https://streamable.com/g/moo/username/extra</p>
    <p>https://streamable.com/o/moo/username/extra</p>
    <p>https://streamable.com/s/moo/username/extra</p>
    <p>https://streamable.com/t/moo/username/extra</p>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
    <iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>

  `);
});
