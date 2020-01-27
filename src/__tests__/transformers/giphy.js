import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../../';
import {
  getGIPHYId,
  getGIPHYResponsivePadding,
  getHTML,
  shouldTransform,
} from '../../transformers/GIPHY';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

jest.mock('node-fetch', () => jest.fn());

const mockFetch = (width, height) =>
  fetchMock.mockResolvedValue({
    json: () => Promise.resolve({ width, height }),
  });

beforeEach(() => {
  fetchMock.mockClear();
});

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Giphy url': {
      url: 'https://not-a-giphy-url.com',
      valid: false,
    },
    "non-Giphy url ending with 'giphy.com'": {
      url: 'https://this-is-not-giphy.com',
      valid: false,
    },
    "non-Giphy url ending with 'giphy.com' and having '/gifs/' in the url": {
      url:
        'https://this-is-not-giphy.com/gifs/cute-aww-wholesome-4ZrZm6LoXmDZ7Pux3m',
      valid: false,
    },
    'video url': {
      url:
        'https://giphy.com/videos/blesstheharts-wayne-bless-the-harts-ciwJyqlgAYkvguS2Nw',
      valid: false,
    },
    'media subdomain': {
      url: 'https://media.giphy.com/media/UUi1SJNYpMguAcnKsh/giphy.gif',
      valid: true,
    },
    'media numbered subdomain': {
      url: 'https://media0.giphy.com/media/8P7qnlQ6o0NF5R8IEB/giphy.gif',
      valid: true,
    },
    'gif url': {
      url: 'https://giphy.com/gifs/cute-aww-wholesome-4ZrZm6LoXmDZ7Pux3m',
      valid: true,
    },
  }
);

cases(
  'getGIPHYId',
  ({ url, id }) => {
    expect(getGIPHYId(url)).toBe(id);
  },
  {
    'video url': {
      url:
        'https://giphy.com/videos/blesstheharts-wayne-bless-the-harts-ciNwwJyqlgAYkvguS2',
      id: 'ciNwwJyqlgAYkvguS2',
    },
    'media subdomain': {
      url: 'https://media.giphy.com/media/UUi1SJNYpMguAcnKsh/giphy.gif',
      id: 'UUi1SJNYpMguAcnKsh',
    },
    'media numbered subdomain': {
      url: 'https://media0.giphy.com/media/8P7qnlQ6o0NF5R8IEB/giphy.gif',
      id: '8P7qnlQ6o0NF5R8IEB',
    },
    'gif url': {
      url: 'https://giphy.com/gifs/cute-aww-wholesome-4ZrZm6LoXmDZ7Pux3m',
      id: '4ZrZm6LoXmDZ7Pux3m',
    },
  }
);

cases(
  'getGIPHYResponsivePadding',
  ({ width, height, padding }) => {
    expect(getGIPHYResponsivePadding({ height, width })).toBe(padding);
  },
  [
    {
      width: 480,
      height: 270,
      padding: 56,
    },
    {
      width: 500,
      height: 375,
      padding: 75,
    },
    {
      width: 300,
      height: 151,
      padding: 50,
    },
  ]
);

test('Gets the correct Giphy iframe', async () => {
  mockFetch(480, 270);

  const html = await getHTML(
    'https://giphy.com/gifs/cute-aww-wholesome-4ZrZm6LoXmDZ7Pux3m'
  );

  expect(html).toMatchInlineSnapshot(
    `"<div style=\\"width:100%;height:0;padding-bottom:56%;position:relative;\\"><iframe src=\\"https://giphy.com/embed/4ZrZm6LoXmDZ7Pux3m\\" width=\\"100%\\" height=\\"100%\\" style=\\"position:absolute\\" frameBorder=\\"0\\" class=\\"giphy-embed\\" allowFullScreen></iframe></div><p><a href=\\"https://giphy.com/gifs/4ZrZm6LoXmDZ7Pux3m\\">via GIPHY</a></p>"`
  );
});

test('Plugin can transform Giphy links', async () => {
  mockFetch(480, 270);

  const markdownAST = getMarkdownASTForFile('Giphy');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-a-giphy-url.com>

    <https://this-is-not-giphy.com>

    <https://this-is-not-giphy.com/gifs/cute-aww-wholesome-4ZrZm6LoXmDZ7Pux3m>

    <https://giphy.com/videos/blesstheharts-wayne-bless-the-harts-ciwJyqlgAYkvguS2Nw>

    <div style=\\"width:100%;height:0;padding-bottom:56%;position:relative;\\"><iframe src=\\"https://giphy.com/embed/4ZrZm6LoXmDZ7Pux3m\\" width=\\"100%\\" height=\\"100%\\" style=\\"position:absolute\\" frameBorder=\\"0\\" class=\\"giphy-embed\\" allowFullScreen></iframe></div><p><a href=\\"https://giphy.com/gifs/4ZrZm6LoXmDZ7Pux3m\\">via GIPHY</a></p>

    <div style=\\"width:100%;height:0;padding-bottom:56%;position:relative;\\"><iframe src=\\"https://giphy.com/embed/4ZrZm6LoXmDZ7Pux3m\\" width=\\"100%\\" height=\\"100%\\" style=\\"position:absolute\\" frameBorder=\\"0\\" class=\\"giphy-embed\\" allowFullScreen></iframe></div><p><a href=\\"https://giphy.com/gifs/4ZrZm6LoXmDZ7Pux3m\\">via GIPHY</a></p>

    <div style=\\"width:100%;height:0;padding-bottom:56%;position:relative;\\"><iframe src=\\"https://giphy.com/embed/4ZrZm6LoXmDZ7Pux3m\\" width=\\"100%\\" height=\\"100%\\" style=\\"position:absolute\\" frameBorder=\\"0\\" class=\\"giphy-embed\\" allowFullScreen></iframe></div><p><a href=\\"https://giphy.com/gifs/4ZrZm6LoXmDZ7Pux3m\\">via GIPHY</a></p>
    "
  `);
});
