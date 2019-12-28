import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../..';
import { getHTML, shouldTransform } from '../../transformers/Instagram';

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
    'non-Instagram url': {
      url: 'https://not-an-instagram-url.com',
      valid: false,
    },
    "non-Instagram url ending with 'instagram.com'": {
      url: 'https://this-is-not-instagram.com',
      valid: false,
    },
    "non-Instagram url ending with 'instagram.com' and having '/p/'": {
      url: 'https://this-is-not-instagram.com/p/123',
      valid: false,
    },
    "non-Instagram url ending with 'instagr.am/'": {
      url: 'https://this-is-not-instagr.am/',
      valid: false,
    },
    'profile url': {
      url: 'https://instagram.com/FabioRosado',
      valid: false,
    },
    'image url': {
      url: 'https://instagram.com/p/B39qQ_GJ_kE/',
      valid: true,
    },
    "status url having 'www' subdomain": {
      url: 'https://www.instagram.com/p/B39qQ_GJ_kE/',
      valid: true,
    },
    "image url with 'instagr.am'": {
      url: 'https://instagram.com/p/B39qQ_GJ_kE/',
      valid: true,
    },
  }
);

test('Gets the correct Instagram iframe', async () => {
  mockFetch(
    `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink data-instgrm-version="12"><div> <a href> <div><svg></svg></div><div> View this post on Instagram</div><div style="mocked-styles"></div> </div></div></a> <p> <a href>description</a></p> <p>A post shared by <a href> Fábio  Rosado</a> (@fabiorosado) on <time datetime>date</time></p></div></blockquote>`
  );

  const html = await getHTML('https://www.instagram.com/p/B39qQ_GJ_kE/');

  expect(html).toMatchInlineSnapshot(
    `"<blockquote class=\\"instagram-media\\" data-instgrm-captioned data-instgrm-permalink data-instgrm-version=\\"12\\"><div> <a href> <div><svg></svg></div><div> View this post on Instagram</div><div style=\\"mocked-styles\\"></div> </div></div></a> <p> <a href>description</a></p> <p>A post shared by <a href> Fábio  Rosado</a> (@fabiorosado) on <time datetime>date</time></p></div></blockquote>"`
  );
});

test('Plugin can transform Instagram links', async () => {
  mockFetch(
    `<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink data-instgrm-version="12"><div> <a href> <div><svg></svg></div><div> View this post on Instagram</div><div style="mocked-styles"></div> </div></div></a> <p> <a href>description</a></p> <p>A post shared by <a href> Fábio  Rosado</a> (@fabiorosado) on <time datetime>date</time></p></div></blockquote>`
  );
  const markdownAST = getMarkdownASTForFile('Instagram');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-an-instagram-url.com>

    <https://this-is-not-instagram.com>

    <https://this-is-not-instagram.com/foobar/status/123>

    <https://www.instagram.com/FabioRosado>

    <blockquote class=\\"instagram-media\\" data-instgrm-captioned data-instgrm-permalink data-instgrm-version=\\"12\\"><div> <a href> <div><svg></svg></div><div> View this post on Instagram</div><div style=\\"mocked-styles\\"></div> </div></div></a> <p> <a href>description</a></p> <p>A post shared by <a href> Fábio  Rosado</a> (@fabiorosado) on <time datetime>date</time></p></div></blockquote>

    <blockquote class=\\"instagram-media\\" data-instgrm-captioned data-instgrm-permalink data-instgrm-version=\\"12\\"><div> <a href> <div><svg></svg></div><div> View this post on Instagram</div><div style=\\"mocked-styles\\"></div> </div></div></a> <p> <a href>description</a></p> <p>A post shared by <a href> Fábio  Rosado</a> (@fabiorosado) on <time datetime>date</time></p></div></blockquote>
    
    <blockquote class=\\"instagram-media\\" data-instgrm-captioned data-instgrm-permalink data-instgrm-version=\\"12\\"><div> <a href> <div><svg></svg></div><div> View this post on Instagram</div><div style=\\"mocked-styles\\"></div> </div></div></a> <p> <a href>description</a></p> <p>A post shared by <a href> Fábio  Rosado</a> (@fabiorosado) on <time datetime>date</time></p></div></blockquote>
    "
  `);
});
