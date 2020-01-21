import cases from 'jest-in-case';

import plugin from '../../';
import { getHTML, shouldTransform } from '../../transformers/Lichess';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Lichess url': {
      url: 'https://not-a-lichess-url.org',
      valid: false,
    },
    "non-Lichess url ending with 'lichess.org'": {
      url: 'https://this-is-not-lichess.org',
      valid: false,
    },
    "non-Lichess url ending with 'lichess.org' having '/embed/' path": {
      url: 'https://this-is-not-lichess.org/embed/MPJcy1JW',
      valid: false,
    },
    'embed game url': {
      url: 'https://lichess.org/embed/MPJcy1JW',
      valid: false,
    },
    'learn url': {
      url: 'https://lichess.org/learn',
      valid: false,
    },
    'practice url': {
      url: 'https://lichess.org/practice',
      valid: false,
    },
    'study list url': {
      url: 'https://lichess.org/study',
      valid: false,
    },
    'study url': {
      url: 'https://lichess.org/study/XtFCFYlM',
      valid: false,
    },
    'training url': {
      url: 'https://lichess.org/training/12345',
      valid: false,
    },
    'tv list url': {
      url: 'https://lichess.org/tv',
      valid: false,
    },
    'tv url': {
      url: 'https://lichess.org/tv/best',
      valid: false,
    },
    'game url': {
      url: 'https://lichess.org/MPJcy1JW',
      valid: true,
    },
    "game url having 'www' subdomain": {
      url: 'https://www.lichess.org/MPJcy1JW',
      valid: true,
    },
    'game url with parameters': {
      url: 'https://lichess.org/MPJcy1JW?theme=auto&bg=auto',
      valid: true,
    },
    "game url with parameters having 'www' subdomain": {
      url: 'https://www.lichess.org/MPJcy1JW?theme=auto&bg=auto',
      valid: true,
    },
    "game url with game-ID starting with 'tv'": {
      url: 'https://lichess.org/tv123abc56de',
      valid: true,
    },
    "game url with game-ID starting with 'tv' and having 'www' subdomain": {
      url: 'https://www.lichess.org/tv123abc56de',
      valid: true,
    },
  }
);

test('Gets the correct Lichess iframe', () => {
  const html = getHTML('https://lichess.org/MPJcy1JW');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://lichess.org/embed/MPJcy1JW\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>"`
  );
});

test('Plugin can transform Lichess links', async () => {
  const markdownAST = getMarkdownASTForFile('Lichess');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-a-lichess-url.org>

    <https://this-is-not-lichess.org>

    <https://this-is-not-lichess.org/embed/MPJcy1JW>

    <https://lichess.org/embed/MPJcy1JW>

    <https://lichess.org/learn>

    <https://lichess.org/practice>

    <https://lichess.org/study>

    <https://lichess.org/study/XtFCFYlM>

    <https://lichess.org/training/12345>

    <https://lichess.org/tv>

    <https://lichess.org/tv/best>

    <iframe src=\\"https://lichess.org/embed/MPJcy1JW\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>

    <iframe src=\\"https://www.lichess.org/embed/MPJcy1JW\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>

    <iframe src=\\"https://lichess.org/embed/MPJcy1JW?theme=auto&bg=auto\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>

    <iframe src=\\"https://www.lichess.org/embed/MPJcy1JW?theme=auto&bg=auto\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>

    <iframe src=\\"https://lichess.org/embed/tv123abc56de\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>

    <iframe src=\\"https://www.lichess.org/embed/tv123abc56de\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>
    "
  `);
});
