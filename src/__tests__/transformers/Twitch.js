import cases from 'jest-in-case';

import plugin from '../..';
import {
  getHTML,
  getTwitchIFrameSrc,
  normalizeParent,
  shouldTransform,
} from '../../transformers/Twitch';

import { cache, getMarkdownASTForFile, mdastToHtml } from '../helpers';

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
    blog: {
      url: 'https://blog.twitch.tv',
      valid: false,
    },
    'followers page': {
      url: 'https://twitch.tv/jlengstorf/followers',
      valid: false,
    },
    homepage: {
      url: 'https://twitch.tv',
      valid: false,
    },
    'settings page': {
      url: 'https://twitch.tv/settings/profile',
      valid: false,
    },
    'videos page': {
      url: 'https://twitch.tv/jlengstorf/videos',
      valid: false,
    },
    "clip url having 'clips' subdomain & '/embed' path": {
      url:
        'https://clips.twitch.tv/embed?clip=PeacefulAbstrusePorcupineDansGame',
      valid: false,
    },
    'channel url': {
      url: 'https://twitch.tv/jlengstorf',
      valid: true,
    },
    "channel url having 'www' subdomain": {
      url: 'https://www.twitch.tv/jlengstorf',
      valid: true,
    },
    "channel url having 'player' subdomain": {
      url: 'https://player.twitch.tv?channel=jlengstorf',
      valid: true,
    },
    'clip url': {
      url:
        'https://twitch.tv/jlengstorf/clip/PeacefulAbstrusePorcupineDansGame',
      valid: true,
    },
    "clip url having 'clips' subdomain": {
      url: 'https://clips.twitch.tv/PeacefulAbstrusePorcupineDansGame',
      valid: true,
    },
    "clip url having 'www' subdomain": {
      url:
        'https://www.twitch.tv/jlengstorf/clip/PeacefulAbstrusePorcupineDansGame',
      valid: true,
    },
    'collection url': {
      url: 'https://twitch.tv/collections/DHetedhyqBSVMg',
      valid: true,
    },
    "collection url having 'www' subdomain": {
      url: 'https://www.twitch.tv/collections/DHetedhyqBSVMg',
      valid: true,
    },
    "collection url having 'player' subdomain": {
      url: 'https://player.twitch.tv?collection=DHetedhyqBSVMg',
      valid: true,
    },
    "collection url having '[CHANNELNAME]/collections/' path": {
      url: 'https://twitch.tv/kaypikefashion/collection/DHetedhyqBSVMg',
      valid: true,
    },
    "collection url having '[CHANNELNAME]/collections/' path & 'www' subdomain": {
      url: 'https://www.twitch.tv/kaypikefashion/collection/DHetedhyqBSVMg',
      valid: true,
    },
    'video url': {
      url: 'https://twitch.tv/videos/546761743',
      valid: true,
    },
    "video url having 'www' subdomain": {
      url: 'https://www.twitch.tv/videos/546761743',
      valid: true,
    },
    "video url having 'player' subdomain": {
      url: 'https://player.twitch.tv?video=546761743',
      valid: true,
    },
  }
);

cases(
  'getTwitchIFrameSrc',
  ({ iframe, url }) => {
    expect(getTwitchIFrameSrc(url)).toBe(iframe);
  },
  {
    'channel url': {
      url: 'https://twitch.tv/jlengstorf',
      iframe: 'https://player.twitch.tv?channel=jlengstorf',
    },
    "channel url having 'www' subdomain": {
      url: 'https://www.twitch.tv/jlengstorf',
      iframe: 'https://player.twitch.tv?channel=jlengstorf',
    },
    "channel url having 'player' subdomain": {
      url: 'https://player.twitch.tv?channel=jlengstorf',
      iframe: 'https://player.twitch.tv?channel=jlengstorf',
    },
    'clip url': {
      url:
        'https://twitch.tv/jlengstorf/clip/PeacefulAbstrusePorcupineDansGame',
      iframe:
        'https://clips.twitch.tv/embed?clip=PeacefulAbstrusePorcupineDansGame',
    },
    "clip url having 'clips' subdomain": {
      url: 'https://clips.twitch.tv/PeacefulAbstrusePorcupineDansGame',
      iframe:
        'https://clips.twitch.tv/embed?clip=PeacefulAbstrusePorcupineDansGame',
    },
    "clip url having 'www' subdomain": {
      url:
        'https://www.twitch.tv/jlengstorf/clip/PeacefulAbstrusePorcupineDansGame',
      iframe:
        'https://clips.twitch.tv/embed?clip=PeacefulAbstrusePorcupineDansGame',
    },
    'collection url': {
      url: 'https://twitch.tv/collections/DHetedhyqBSVMg',
      iframe: 'https://player.twitch.tv?collection=DHetedhyqBSVMg',
    },
    "collection url having 'www' subdomain": {
      url: 'https://www.twitch.tv/collections/DHetedhyqBSVMg',
      iframe: 'https://player.twitch.tv?collection=DHetedhyqBSVMg',
    },
    "collection url having 'player' subdomain": {
      url: 'https://player.twitch.tv?collection=DHetedhyqBSVMg',
      iframe: 'https://player.twitch.tv?collection=DHetedhyqBSVMg',
    },
    "collection url having '[CHANNELNAME]/collections/' path": {
      url: 'https://twitch.tv/kaypikefashion/collection/DHetedhyqBSVMg',
      iframe: 'https://player.twitch.tv?collection=DHetedhyqBSVMg',
    },
    "collection url having '[CHANNELNAME]/collections/' path & 'www' subdomain": {
      url: 'https://www.twitch.tv/kaypikefashion/collection/DHetedhyqBSVMg',
      iframe: 'https://player.twitch.tv?collection=DHetedhyqBSVMg',
    },
    'video url': {
      url: 'https://twitch.tv/videos/546761743',
      iframe: 'https://player.twitch.tv?video=546761743',
    },
    "video url having 'www' subdomain": {
      url: 'https://www.twitch.tv/videos/546761743',
      iframe: 'https://player.twitch.tv?video=546761743',
    },
    "video url having 'player' subdomain": {
      url: 'https://player.twitch.tv?video=546761743',
      iframe: 'https://player.twitch.tv?video=546761743',
    },
  }
);

cases(
  'normalizeParent',
  ({ normalizedParent, parent }) => {
    expect(normalizeParent(parent)).toBe(normalizedParent);
  },
  [
    { parent: 'embed.example.com', normalizedParent: 'embed.example.com' },
    { parent: ['embed.example.com'], normalizedParent: 'embed.example.com' },
    {
      parent: ['embed.example.com', 'streamernews.example.com'],
      normalizedParent: 'embed.example.com&parent=streamernews.example.com',
    },
  ]
);

test('Gets the correct Twitch iframe', () => {
  const html = getHTML('https://twitch.tv/videos/546761743', {
    parent: 'embed.example.com',
  });

  expect(html).toMatchInlineSnapshot(
    `<iframe src="https://player.twitch.tv?video=546761743&parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>`
  );
});

test('Plugin can transform Twitch links', async () => {
  const markdownAST = getMarkdownASTForFile('Twitch');

  const processedAST = await plugin(
    { cache, markdownAST },
    {
      services: {
        Twitch: {
          parent: 'embed.example.com',
        },
      },
    }
  );

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://not-a-twitch-url.tv</p>
    <p>https://this-is-not-twitch.tv</p>
    <p>https://blog.twitch.tv</p>
    <p>https://twitch.tv/jlengstorf/followers</p>
    <p>https://twitch.tv</p>
    <p>https://twitch.tv/settings/profile</p>
    <p>https://twitch.tv/jlengstorf/videos</p>
    <p>https://clips.twitch.tv/embed?clip=PeacefulAbstrusePorcupineDansGame</p>
    <iframe src="https://player.twitch.tv?channel=jlengstorf&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?channel=jlengstorf&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?channel=jlengstorf&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://clips.twitch.tv/embed?clip=PeacefulAbstrusePorcupineDansGame&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://clips.twitch.tv/embed?clip=PeacefulAbstrusePorcupineDansGame&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://clips.twitch.tv/embed?clip=PeacefulAbstrusePorcupineDansGame&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?collection=DHetedhyqBSVMg&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?collection=DHetedhyqBSVMg&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?collection=DHetedhyqBSVMg&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?collection=DHetedhyqBSVMg&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?collection=DHetedhyqBSVMg&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?video=546761743&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?video=546761743&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    <iframe src="https://player.twitch.tv?video=546761743&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>

  `);
});
