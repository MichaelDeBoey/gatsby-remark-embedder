import cases from 'jest-in-case';

import plugin from '../..';
import { getHTML, shouldTransform } from '../../transformers/Pinterest';

import { cache, getMarkdownASTForFile, mdastToHtml } from '../helpers';

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
    "non-Pinterest url ending with 'pinterest.com'": {
      url: 'https://this-is-not-pinterest.com',
      valid: false,
    },
    "non-Pinterest url ending with 'pinterest.com' and having '/pin/' in the url": {
      url: 'https://this-is-not-pinterest.com/pin/99360735500167749',
      valid: false,
    },
    'board url': {
      url: 'https://pinterest.com/pinterest/official-news',
      valid: true,
    },
    "board url having 'www' subdomain": {
      url: 'https://www.pinterest.com/pinterest/official-news',
      valid: true,
    },
    'pin url': {
      url: 'https://pinterest.com/pin/99360735500167749',
      valid: true,
    },
    "pin url having 'www' subdomain": {
      url: 'https://www.pinterest.com/pin/99360735500167749',
      valid: true,
    },
    'profile url': {
      url: 'https://pinterest.com/pinterest',
      valid: true,
    },
    "profile url having 'www' subdomain": {
      url: 'https://www.pinterest.com/pinterest',
      valid: true,
    },
  }
);

test('Gets the correct Pinterest board link', () => {
  const html = getHTML('https://pinterest.com/pinterest/official-news');

  expect(html).toMatchInlineSnapshot(
    `<a data-pin-do="embedBoard" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="https://pinterest.com/pinterest/official-news"></a>`
  );
});

test('Gets the correct Pinterest pin link', () => {
  const html = getHTML('https://pinterest.com/pin/99360735500167749');

  expect(html).toMatchInlineSnapshot(
    `<a data-pin-do="embedPin" href="https://pinterest.com/pin/99360735500167749"></a>`
  );
});

test('Gets the correct Pinterest profile link', () => {
  const html = getHTML('https://pinterest.com/pinterest');

  expect(html).toMatchInlineSnapshot(
    `<a data-pin-do="embedUser" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="https://pinterest.com/pinterest"></a>`
  );
});

test('Plugin can transform Pinterest links', async () => {
  const markdownAST = getMarkdownASTForFile('Pinterest');

  const processedAST = await plugin({ cache, markdownAST });

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://not-a-pinterest-url.com</p>
    <p>https://this-is-not-pinterest.com</p>
    <p>https://this-is-not-pinterest.com/pin/99360735500167749</p>
    <a data-pin-do="embedBoard" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="https://pinterest.com/pinterest/official-news"></a>
    <a data-pin-do="embedBoard" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="https://www.pinterest.com/pinterest/official-news"></a>
    <a data-pin-do="embedPin" href="https://pinterest.com/pin/99360735500167749"></a>
    <a data-pin-do="embedPin" href="https://www.pinterest.com/pin/99360735500167749"></a>
    <a data-pin-do="embedUser" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="https://pinterest.com/pinterest"></a>
    <a data-pin-do="embedUser" data-pin-board-width="400" data-pin-scale-height="240" data-pin-scale-width="80" href="https://www.pinterest.com/pinterest"></a>

  `);
});
