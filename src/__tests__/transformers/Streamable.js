import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../../';
import { getHTML, shouldTransform } from '../../transformers/Streamable';
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
    'non-streamable url': {
      url: 'https://no-streamable-url-here.com',
      valid: false,
    },
    'streamable-url-with-valid-embed-ending': {
      url: 'https://streamable.com/bx960',
      valid: true,
    },
    'streamable-url-with-s-valid-embed-ending': {
      url: 'https://streamable.com/s/bx960',
      valid: true,
    },
    'streamable-url-with-o-valid-embed-ending': {
      url: 'https://streamable.com/s/bx960',
      valid: true,
    },
    'streamable-url-with-long-embed-ending': {
      url: 'https://streamable.com/s/bx960/hcobuo',
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
    `"<iframe class=\\"mocked-response\\" src=\\"https://streamable.com/o/bx960\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>"`
  );
});

test('Plugin correctly transforms Streamable links', async () => {
  mockFetch(
    `<iframe class="streamable-embed-mocked-fetch-plugin" src="https://streamable.com/o/bx960" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`
  );
  const markdownAST = getMarkdownASTForFile('Streamable');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://no-streamable-url-here.com>

    <iframe class=\\"mocked-response\\" src=\\"https://streamable.com/o/bx960\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"mocked-response\\" src=\\"https://streamable.com/o/bx960\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"mocked-response\\" src=\\"https://streamable.com/o/bx960\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

    <iframe class=\\"mocked-response\\" src=\\"https://streamable.com/o/bx960\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>
    "
  `);
});
