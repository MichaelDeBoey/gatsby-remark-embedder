import cases from 'jest-in-case';

import plugin from '../..';
import { getHTML, shouldTransform } from '../../transformers/Pinterest';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Pinterest url': {
      url: 'https://not-a-pinterest-url.com',
      valid: false,
    },
    "non-Pinterest url ending with 'twitter.com'": {
      url: 'https://this-is-not-pinterest.com',
      valid: false,
    },
    "non-Pinterest url ending with 'twitter.com' and having '/pin/'": {
      url: 'https://this-is-not-pinterest.com/pin/123',
      valid: false,
    },
    'pin url': {
      url: 'https://www.pinterest.com/pin/99360735500167749/',
      valid: true,
    },
    'board url': {
      url: 'https://www.pinterest.com/pinterest/official-news/',
      valid: true,
    },
    'profile url': {
      url: 'https://www.pinterest.com/pinterest/',
      valid: true,
    },
  }
);

test('Gets the correct Pinterest html code', () => {
  const html = getHTML('https://www.pinterest.com/pin/99360735500167749/');

  expect(html).toMatchInlineSnapshot(
    `"<a data-pin-do=\\"embedPin\\" href=\\"https://www.pinterest.com/pin/99360735500167749/\\"></a>"`
  );
});

test('Plugin can transform Pinterest links', async () => {
  const markdownAST = getMarkdownASTForFile('Pinterest');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-a-pinterest-url.com>

    <https://this-is-not-pinterest.com>

    <https://this-is-not-pinterest.com/pin/123>

    <a data-pin-do=\\"embedPin\\" href=\\"https://www.pinterest.com/pin/99360735500167749/\\"></a>

    <a data-pin-do=\\"embedBoard\\" data-pin-board-width=\\"400\\" data-pin-scale-height=\\"240\\" data-pin-scale-width=\\"80\\" href=\\"https://www.pinterest.com/pinterest/official-news/\\"></a>

    <a data-pin-do=\\"embedUser\\" data-pin-board-width=\\"400\\" data-pin-scale-height=\\"240\\" data-pin-scale-width=\\"80\\" href=\\"https://www.pinterest.com/pinterest/\\"></a>
    "
  `);
});
