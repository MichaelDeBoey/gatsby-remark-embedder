import cases from 'jest-in-case';

import plugin from '../..';
import { getHTML, shouldTransform } from '../../transformers/Twitch';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Twitch url': {
      url: 'https://not-a-twitch-url.tv',
      valid: false,
    },
    "non-Twitch url ending with 'twitch.tv'": {
      url: 'https://this-is-not-twitch.tv',
      valid: false,
    },
    'Twitch url': {
      url: 'https://twitch.tv/FabioRosado',
      valid: true,
    },
    "Twitch url having 'www' subdomain": {
      url: 'https://www.twitch.tv/FabioRosado',
      valid: true,
    },
    'Twitch url with channel': {
      url: 'https://twitch.tv/channel=TheFlyingDev',
      valid: true,
    },
    "Twitch url with channel having 'www' subdomain": {
      url: 'https://www.twitch.tv/channel=TheFlyingDev',
      valid: true,
    },
    'Twitch url with video having': {
      url: 'https://www.twitch.tv/video=1204jfh',
      valid: true,
    },
    'Twitch url with collection having subdomain': {
      url: 'https://www.twitch.tv/collection=130kJIt',
      valid: true,
    },
    'Twitch url got from popup': {
      url:
        'https://player.twitch.tv/?channel=sacriel&enableExtensions=true&player=popout&volume=0.5',
      valid: true,
    },
  }
);

test('Gets the correct Twitch iframe', () => {
  const html = getHTML('https://twitch.tv/testLink');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=https://player.twitch.tv/?channel=testLink height=\\"600\\" width=\\"400\\" frameborder=\\"0\\" scrolling=\\"no\\" allowfullscreen=\\"true\\"></iframe>"`
  );
});

test('Plugin can transform Twitch links', async () => {
  const markdownAST = getMarkdownASTForFile('Twitch');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-a-twitch-url.tv>

    <https://this-is-not-twitch.tv>

    <https://this-is-not-twitch.tv/?channel=testChannel>

    <iframe src=https://player.twitch.tv/?channel=FabioRosado height=\\"600\\" width=\\"400\\" frameborder=\\"0\\" scrolling=\\"no\\" allowfullscreen=\\"true\\"></iframe>

    <iframe src=https://player.twitch.tv/?channel=TestChannel height=\\"600\\" width=\\"400\\" frameborder=\\"0\\" scrolling=\\"no\\" allowfullscreen=\\"true\\"></iframe>

    <iframe src=https://player.twitch.tv/?collection=testCollection height=\\"600\\" width=\\"400\\" frameborder=\\"0\\" scrolling=\\"no\\" allowfullscreen=\\"true\\"></iframe>

    <iframe src=https://player.twitch.tv/?video=testVideo height=\\"600\\" width=\\"400\\" frameborder=\\"0\\" scrolling=\\"no\\" allowfullscreen=\\"true\\"></iframe>
    
    <iframe src=https://player.twitch.tv/?channel=sacriel&enableExtensions=true&player=popout&volume=0.5 height=\\"600\\" width=\\"400\\" frameborder=\\"0\\" scrolling=\\"no\\" allowfullscreen=\\"true\\"></iframe>
    "
  `);
});
