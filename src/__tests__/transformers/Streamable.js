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
    <p><a href="https://not-a-streamable-url.com">https://not-a-streamable-url.com</a></p>
    <p><a href="https://this-is-not-streamable.com">https://this-is-not-streamable.com</a></p>
    <p><a href="https://streamable.com/documentation">https://streamable.com/documentation</a></p>
    <p><a href="https://streamable.com/login">https://streamable.com/login</a></p>
    <p><a href="https://streamable.com/recover">https://streamable.com/recover</a></p>
    <p><a href="https://streamable.com/settings">https://streamable.com/settings</a></p>
    <p><a href="https://streamable.com/signup">https://streamable.com/signup</a></p>
    <p><a href="https://streamable.com/e/moo/username/extra">https://streamable.com/e/moo/username/extra</a></p>
    <p><a href="https://streamable.com/g/moo/username/extra">https://streamable.com/g/moo/username/extra</a></p>
    <p><a href="https://streamable.com/o/moo/username/extra">https://streamable.com/o/moo/username/extra</a></p>
    <p><a href="https://streamable.com/s/moo/username/extra">https://streamable.com/s/moo/username/extra</a></p>
    <p><a href="https://streamable.com/t/moo/username/extra">https://streamable.com/t/moo/username/extra</a></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>
    <p><iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe></p>

  `);
});
