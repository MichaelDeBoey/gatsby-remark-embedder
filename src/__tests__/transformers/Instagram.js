import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../../';
import { getHTML, shouldTransform } from '../../transformers/Instagram';

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
    'non-Instagram url': {
      url: 'https://not-an-instagram-url.com',
      valid: false,
    },
    "non-Instagram url ending with 'instagr.am'": {
      url: 'https://this-is-not-instagr.am',
      valid: false,
    },
    "non-Instagram url ending with 'instagram.com'": {
      url: 'https://this-is-not-instagram.com',
      valid: false,
    },
    "non-Instagram url ending with 'instagr.am' and having '/p/' path": {
      url: 'https://this-is-not-instagr.am/p/B60jPE6J8U-',
      valid: false,
    },
    "non-Instagram url ending with 'instagram.com' and having '/p/' path": {
      url: 'https://this-is-not-instagram.com/p/B60jPE6J8U-',
      valid: false,
    },
    homepage: {
      url: 'https://instagram.com',
      valid: false,
    },
    'activity page': {
      url: 'https://instagram.com/accounts/activity',
      valid: false,
    },
    'edit profile page': {
      url: 'https://instagram.com/accounts/edit',
      valid: false,
    },
    'change password page': {
      url: 'https://instagram.com/accounts/password/change',
      valid: false,
    },
    'explore page': {
      url: 'https://instagram.com/explore',
      valid: false,
    },
    'nametag page': {
      url: 'https://instagram.com/nametag',
      valid: false,
    },
    'profile page': {
      url: 'https://instagram.com/MichaelDeBoey',
      valid: false,
    },
    'about subdomain': {
      url: 'https://about.instagram.com',
      valid: false,
    },
    'help subdomain': {
      url: 'https://help.instagram.com',
      valid: false,
    },
    "post url having 'instagram.com' domain": {
      url: 'https://instagram.com/p/B60jPE6J8U-',
      valid: true,
    },
    "post url having 'instagram.com' domain and 'www' subdomain": {
      url: 'https://www.instagram.com/p/B60jPE6J8U-',
      valid: true,
    },
    "post url having 'instagr.am' domain": {
      url: 'https://instagr.am/p/B60jPE6J8U-',
      valid: true,
    },
    "post url having 'instagr.am' domain and 'www' subdomain": {
      url: 'https://www.instagr.am/p/B60jPE6J8U-',
      valid: true,
    },
  }
);

test('Gets the correct Instagram iframe', async () => {
  mockFetch(
    `<blockquote class="instagram-media-mocked-fetch-transformer"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<time datetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>`
  );

  const html = await getHTML('https://instagram.com/p/B60jPE6J8U-', {
    accessToken: 'access-token',
  });

  expect(html).toMatchInlineSnapshot(
    `<blockquote class="instagram-media-mocked-fetch-transformer"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<time datetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>`
  );
});

test('Plugin can transform Instagram links', async () => {
  mockFetch(
    `<blockquote class="instagram-media-mocked-fetch-plugin"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<time datetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>`
  );
  const markdownAST = getMarkdownASTForFile('Instagram');

  const processedAST = await plugin(
    { cache, markdownAST },
    {
      services: {
        Instagram: {
          accessToken: 'access-token',
        },
      },
    }
  );

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://not-an-instagram-url.com</p>
    <p>https://this-is-not-instagr.am</p>
    <p>https://this-is-not-instagram.com</p>
    <p>https://this-is-not-instagr.am/p/B60jPE6J8U-</p>
    <p>https://this-is-not-instagram.com/p/B60jPE6J8U-</p>
    <p>https://instagram.com</p>
    <p>https://instagram.com/accounts/activity</p>
    <p>https://instagram.com/accounts/edit</p>
    <p>https://instagram.com/accounts/password/change</p>
    <p>https://instagram.com/explore</p>
    <p>https://instagram.com/nametag</p>
    <p>https://instagram.com/MichaelDeBoey</p>
    <p>https://about.instagram.com</p>
    <p>https://help.instagram.com</p>
    <blockquote class="instagram-media-mocked-fetch-plugin"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<time datetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>
    <blockquote class="instagram-media-mocked-fetch-plugin"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<time datetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>
    <blockquote class="instagram-media-mocked-fetch-plugin"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<time datetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>
    <blockquote class="instagram-media-mocked-fetch-plugin"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<time datetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>

  `);
});
