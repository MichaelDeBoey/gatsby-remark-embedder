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
    'non-lichess url': {
      url: 'https://not-a-lichess-url.org',
      valid: false,
    },
    "non-lichess url ending with 'lichess.org'": {
      url: 'https://this-is-not-lichess.org',
      valid: false,
    },
    "non-lichess url ending with 'lichess.org' having '/embed/'": {
      url: 'https://this-is-not-lichess.org/embed/p4auwhl8',
      valid: false,
    },
    'embed url': {
      url: 'https://lichess.org/embed/p4auwhl8',
      valid: false,
    },
    'study url': {
      url: 'https://lichess.org/study/F1EGw5B7',
      valid: false,
    },
    'tv url': {
      url: 'https://lichess.org/tv/',
      valid: false,
    },
    'Normal match url without parameters': {
      url: 'https://lichess.org/p4auwhl8',
      valid: true,
    },
    'Normal match url with parameters': {
      url: 'https://lichess.org/p4auwhl8?theme=auto&bg=auto',
      valid: true,
    },
    "Match url having 'www' subdomain": {
      url: 'https://www.lichess.org/p4auwhl8?theme=auto&bg=auto',
      valid: true,
    },
  }
);

test('Gets the correct Lichess iframe', () => {
  const html = getHTML('https://lichess.org/p4auwhl8?theme=auto&bg=auto');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://lichess.org/embed/p4auwhl8?theme=auto&bg=auto\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>"`
  );
});

test('Plugin can transform Lichess links', async () => {
  const markdownAST = getMarkdownASTForFile('Lichess');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-a-lichess-url.org>

    <https://this-is-not-lichess.org>

    <https://this-is-not-lichess.org/embed/p4auwhl8>

    <https://lichess.org/embed/p4auwhl8>

    <https://lichess.org/study/F1EGw5B7>

    <https://lichess.org/tv/>

    <iframe src=\\"https://lichess.org/embed/p4auwhl8\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>

    <iframe src=\\"https://lichess.org/embed/p4auwhl8?theme=auto&bg=auto\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>

    <iframe src=\\"https://www.lichess.org/embed/p4auwhl8?theme=auto&bg=auto\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>
    "
  `);
});
