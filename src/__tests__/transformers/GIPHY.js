import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../../';
import {
  getGIPHYId,
  getGIPHYResponsivePadding,
  getHTML,
  shouldTransform,
} from '../../transformers/GIPHY';

import { cache, getMarkdownASTForFile, mdastToHtml } from '../helpers';

const { Response } = jest.requireActual('node-fetch');
jest.mock('node-fetch', () => jest.fn());

const mockFetch = ({ height, width }) =>
  fetchMock.mockImplementation(() =>
    Promise.resolve(new Response(JSON.stringify({ height, width })))
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
    'non-GIPHY url': {
      url: 'https://not-a-giphy-url.com',
      valid: false,
    },
    "non-GIPHY url ending with 'giphy.com'": {
      url: 'https://this-is-not-giphy.com',
      valid: false,
    },
    "non-GIPHY url ending with 'giphy.com' and having '/gifs/' in the url": {
      url:
        'https://this-is-not-giphy.com/gifs/howtogiphygifs-how-to-XatG8bioEwwVO',
      valid: false,
    },
    homepage: {
      url: 'https://giphy.com',
      valid: false,
    },
    'video url': {
      url:
        'https://giphy.com/videos/blesstheharts-wayne-bless-the-harts-ciwJyqlgAYkvguS2Nw',
      valid: false,
    },
    'gif url': {
      url: 'https://giphy.com/gifs/howtogiphygifs-how-to-XatG8bioEwwVO',
      valid: true,
    },
    "gif url having 'media' subdomain": {
      url: 'https://media.giphy.com/media/XatG8bioEwwVO/giphy.gif',
      valid: true,
    },
    "gif url having 'media' subdomain and not ending on 'giphy.gif'": {
      url: 'https://media.giphy.com/media/XatG8bioEwwVO',
      valid: true,
    },
    "gif url having 'media0' subdomain": {
      url: 'https://media0.giphy.com/media/XatG8bioEwwVO/giphy.gif',
      valid: true,
    },
    "gif url having 'media0' subdomain and not ending on 'giphy.gif'": {
      url: 'https://media0.giphy.com/media/XatG8bioEwwVO',
      valid: true,
    },
  }
);

cases(
  'getGIPHYId',
  ({ id, url }) => {
    expect(getGIPHYId(url)).toBe(id);
  },
  {
    'media subdomain': {
      url: 'https://media.giphy.com/media/UUi1SJNYpMguAcnKsh/giphy.gif',
      id: 'UUi1SJNYpMguAcnKsh',
    },
    'media numbered subdomain': {
      url: 'https://media0.giphy.com/media/8P7qnlQ6o0NF5R8IEB/giphy.gif',
      id: '8P7qnlQ6o0NF5R8IEB',
    },
    'gif url': {
      url: 'https://giphy.com/gifs/howtogiphygifs-how-to-XatG8bioEwwVO',
      id: 'XatG8bioEwwVO',
    },
  }
);

cases(
  'getGIPHYResponsivePadding',
  ({ height, width, padding }) => {
    expect(getGIPHYResponsivePadding({ height, width })).toBe(padding);
  },
  [
    {
      height: 314,
      width: 500,
      padding: 63,
    },
    {
      height: 270,
      width: 480,
      padding: 56,
    },
    {
      height: 375,
      width: 500,
      padding: 75,
    },
    {
      height: 151,
      width: 300,
      padding: 50,
    },
  ]
);

test('Gets the correct GIPHY iframe', async () => {
  mockFetch({ height: 314, width: 500 });

  const html = await getHTML(
    'https://giphy.com/gifs/howtogiphygifs-how-to-XatG8bioEwwVO'
  );

  expect(html).toMatchInlineSnapshot(
    `<div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="https://giphy.com/embed/XatG8bioEwwVO" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed" allowfullscreen></iframe></div>`
  );
});

test('Plugin can transform GIPHY links', async () => {
  mockFetch({ height: 314, width: 500 });

  const markdownAST = getMarkdownASTForFile('GIPHY');

  const processedAST = await plugin({ cache, markdownAST });

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://not-a-giphy-url.com</p>
    <p>https://this-is-not-giphy.com</p>
    <p>https://this-is-not-giphy.com/gifs/howtogiphygifs-how-to-XatG8bioEwwVO</p>
    <p>https://giphy.com</p>
    <p>https://giphy.com/videos/blesstheharts-wayne-bless-the-harts-ciwJyqlgAYkvguS2Nw</p>
    <div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="https://giphy.com/embed/XatG8bioEwwVO" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed" allowfullscreen></iframe></div>
    <div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="https://giphy.com/embed/XatG8bioEwwVO" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed" allowfullscreen></iframe></div>
    <div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="https://giphy.com/embed/XatG8bioEwwVO" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed" allowfullscreen></iframe></div>
    <div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="https://giphy.com/embed/XatG8bioEwwVO" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed" allowfullscreen></iframe></div>
    <div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="https://giphy.com/embed/XatG8bioEwwVO" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed" allowfullscreen></iframe></div>

  `);
});
