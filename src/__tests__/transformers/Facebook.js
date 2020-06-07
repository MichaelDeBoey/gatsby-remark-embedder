import cases from 'jest-in-case';

import plugin from '../../';
import { getHTML, shouldTransform } from '../../transformers/Facebook';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Facebook url': {
      url: 'https://not-the-facebook-website.com',
      valid: false,
    },
    "non-Facebook url ending with 'facebook.com'": {
      url: 'https://not-facebook.com',
      valid: false,
    },
    "non-Facebook url ending with 'facebook.com' having '/videos/'": {
      url: 'https://not-facebook.com/videos',
      valid: false,
    },
    "non-Facebook url ending with 'facebook.com' having proper path": {
      url: 'https://not-facebook.com/23859431504/videos/688096388646012',
      valid: false,
    },
    'Facebook home page': {
      url: 'https://facebook.com',
      valid: false,
    },
    'Facebook user page': {
      url: 'https://www.facebook.com/profile.php?id=7933107',
      valid: false,
    },
    'Facebook photo post': {
      url: 'https://www.facebook.com/photo?fbid=10115396272683000',
      valid: false,
    },
    'Facebook video post': {
      url: 'https://facebook.com/23859431504/videos/688096388646012',
      valid: true,
    },
    "Facebook video post having 'www' subdomain": {
      url: 'https://www.facebook.com/23859431504/videos/688096388646012',
      valid: true,
    },
    'Facebook named video post': {
      url: 'https://facebook.com/RandyRogersBand/videos/688096388646012',
      valid: true,
    },
    "Facebook named video post having 'www' subdomain": {
      url: 'https://www.facebook.com/RandyRogersBand/videos/688096388646012',
      valid: true,
    },
  }
);

test('Gets the correct Facebook iframe', () => {
  const html = getHTML(
    'https://facebook.com/23859431504/videos/688096388646012'
  );

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://facebook.com/plugins/video.php?href=https://facebook.com/23859431504/videos/688096388646012\\" width=\\"560\\" height=\\"315\\" style=\\"border:none;overflow:hidden\\" scrolling=\\"no\\" frameborder=\\"0\\" allowTransparency=\\"true\\" allowFullScreen=\\"true\\"></iframe>"`
  );
});

test('Plugin can transform Facebook links', async () => {
  const markdownAST = getMarkdownASTForFile('Facebook');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
      "<https://not-the-facebook-website.com>

      <https://not-facebook.com>

      <https://not-facebook.com/videos>

      <https://not-facebook.com/23859431504/videos/688096388646012>

      <https://facebook.com>

      <https://www.facebook.com/profile.php?id=7933107>

      <https://www.facebook.com/photo?fbid=10115396272683000>

      <iframe src=\\"https://facebook.com/plugins/video.php?href=https://facebook.com/23859431504/videos/688096388646012\\" width=\\"560\\" height=\\"315\\" style=\\"border:none;overflow:hidden\\" scrolling=\\"no\\" frameborder=\\"0\\" allowTransparency=\\"true\\" allowFullScreen=\\"true\\"></iframe>

      <iframe src=\\"https://facebook.com/plugins/video.php?href=https://www.facebook.com/23859431504/videos/688096388646012\\" width=\\"560\\" height=\\"315\\" style=\\"border:none;overflow:hidden\\" scrolling=\\"no\\" frameborder=\\"0\\" allowTransparency=\\"true\\" allowFullScreen=\\"true\\"></iframe>

      <iframe src=\\"https://facebook.com/plugins/video.php?href=https://facebook.com/RandyRogersBand/videos/688096388646012\\" width=\\"560\\" height=\\"315\\" style=\\"border:none;overflow:hidden\\" scrolling=\\"no\\" frameborder=\\"0\\" allowTransparency=\\"true\\" allowFullScreen=\\"true\\"></iframe>

      <iframe src=\\"https://facebook.com/plugins/video.php?href=https://www.facebook.com/RandyRogersBand/videos/688096388646012\\" width=\\"560\\" height=\\"315\\" style=\\"border:none;overflow:hidden\\" scrolling=\\"no\\" frameborder=\\"0\\" allowTransparency=\\"true\\" allowFullScreen=\\"true\\"></iframe>
      "
    `);
});
