import cases from 'jest-in-case';

import plugin from '../../';
import {
  getHTML,
  getGoogleSlidesFrameSrc,
  shouldTransform,
} from '../../transformers/GoogleSlides';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-GoogleSlides url': {
      url: 'https://not-a-google-slides-url.com',
      valid: false,
    },
    'non-GoogleDocs url with wrong host': {
      url: 'https://google.docs.com',
      valid: false,
    },
    'incorrect url with no id': {
      url:
        'https://google.docs.com/presentation/d/e/pub?start=false&loop=false&delayms=3000',
      valid: false,
    },
    'incorrect host': {
      url:
        'https://google.docs.com/presentation/d/e/2PACX-1vR8apkUGyfetdVcF226v6fLMrPspWUlrOYFBFRceHjD_pVgXFFp1Ee1lfsOlUYeMnvMh5DrRT-InOE5/pub?start=false&loop=false&delayms=3000',
      valid: false,
    },
    'full url': {
      url:
        'https://docs.google.com/presentation/d/e/2PACX-1vR8apkUGyfetdVcF226v6fLMrPspWUlrOYFBFRceHjD_pVgXFFp1Ee1lfsOlUYeMnvMh5DrRT-InOE5/pub?start=false&loop=false&delayms=3000',
      valid: true,
    },
  }
);

cases(
  'getYouTubeIFrameSrc',
  ({ url, iframe }) => {
    expect(getGoogleSlidesFrameSrc(url)).toBe(iframe);
  },
  {
    'full url': {
      url:
        'https://docs.google.com/presentation/d/e/2PACX-1vR8apkUGyfetdVcF226v6fLMrPspWUlrOYFBFRceHjD_pVgXFFp1Ee1lfsOlUYeMnvMh5DrRT-InOE5/pub?start=false&loop=false&delayms=3000',
      iframe:
        'https://docs.google.com/presentation/d/e/2PACX-1vR8apkUGyfetdVcF226v6fLMrPspWUlrOYFBFRceHjD_pVgXFFp1Ee1lfsOlUYeMnvMh5DrRT-InOE5/embed?start=false&loop=false&delayms=3000',
    },
  }
);

test('Gets the correct GoogleSlides iframe', async () => {
  const html = await getHTML(
    'https://docs.google.com/presentation/d/e/2PACX-1vR8apkUGyfetdVcF226v6fLMrPspWUlrOYFBFRceHjD_pVgXFFp1Ee1lfsOlUYeMnvMh5DrRT-InOE5/pub?start=false&loop=false&delayms=3000'
  );

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://docs.google.com/presentation/d/e/2PACX-1vR8apkUGyfetdVcF226v6fLMrPspWUlrOYFBFRceHjD_pVgXFFp1Ee1lfsOlUYeMnvMh5DrRT-InOE5/embed?start=false&loop=false&delayms=3000\\" frameborder=\\"0\\" width=\\"960\\" height=\\"569\\" allowfullscreen=\\"true\\" mozallowfullscreen=\\"true\\" webkitallowfullscreen=\\"true\\"></iframe>"`
  );
});

test('Plugin can transform Google Slides links', async () => {
  const markdownAST = getMarkdownASTForFile('GoogleSlides');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<iframe src=\\"https://docs.google.com/presentation/d/e/e/embed?start=false&loop=false&delayms=3000\\" frameborder=\\"0\\" width=\\"960\\" height=\\"569\\" allowfullscreen=\\"true\\" mozallowfullscreen=\\"true\\" webkitallowfullscreen=\\"true\\"></iframe>

    <iframe src=\\"https://docs.google.com/presentation/d/e/2PACX-1vR8apkUGyfetdVcF226v6fLMrPspWUlrOYFBFRceHjD_pVgXFFp1Ee1lfsOlUYeMnvMh5DrRT-InOE5/embed?start=false&loop=false&delayms=3000\\" frameborder=\\"0\\" width=\\"960\\" height=\\"569\\" allowfullscreen=\\"true\\" mozallowfullscreen=\\"true\\" webkitallowfullscreen=\\"true\\"></iframe>
    "
  `);
});
