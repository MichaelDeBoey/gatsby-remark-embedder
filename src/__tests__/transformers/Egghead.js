import cases from 'jest-in-case';

import plugin from '../../';
import { getHTML, shouldTransform } from '../../transformers/Egghead';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Egghead url': {
      url: 'https://not-a-egghead-url.io',
      valid: false,
    },
    "non-Egghead url ending with 'egghead.io'": {
      url: 'https://this-is-not-egghead.io',
      valid: false,
    },
    homepage: {
      url: 'https://egghead.io',
      valid: false,
    },
    'browse courses page': {
      url: 'https://egghead.io/browse/frameworks',
      valid: false,
    },
    'course page': {
      url:
        'https://egghead.io/courses/build-a-video-chat-app-with-twilio-and-gatsby',
      valid: false,
    },
    'main lessons page': {
      url: 'https://egghead.io/lessons/',
      valid: false,
    },
    'course lesson page': {
      url: 'https://egghead.io/lessons/gatsby-build-a-page-layout-in-gatsby',
      valid: true,
    },
  }
);

test('Gets the correct Egghead iframe', async () => {
  const html = await getHTML(
    'https://egghead.io/lessons/gatsby-build-a-page-layout-in-gatsby'
  );

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://egghead.io/lessons/gatsby-build-a-page-layout-in-gatsby/embed\\" width=\\"100%\\" allowFullScreen></iframe>"`
  );
});

test('Plugin can transform Egghead links', async () => {
  const markdownAST = getMarkdownASTForFile('Egghead');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-a-egghead-url.io>

    <https://this-is-not-egghead.io>

    <https://egghead.io/browse/frameworks>

    <https://egghead.io/podcasts>

    <https://egghead.io>

    <https://www.egghead.io>

    <https://egghead.io/lessons>

    <https://egghead.io/instructors/jason-lengstorf>

    <https://egghead.io/courses/build-a-video-chat-app-with-twilio-and-gatsby>

    <iframe src=\\"https://egghead.io/lessons/gatsby-build-a-page-layout-in-gatsby/embed\\" width=\\"100%\\" allowFullScreen></iframe>
    "
  `);
});
