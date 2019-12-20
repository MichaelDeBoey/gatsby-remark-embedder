import cases from 'jest-in-case';

import plugin from '../..';
import { getHTML, shouldTransform } from '../../transformers/CodePen';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-CodePen url': {
      url: 'https://not-a-codepen-url.com',
      valid: false,
    },
    "non-CodePen url ending with 'codepen.io'": {
      url: 'https://this-is-not-codepen.io',
      valid: false,
    },
    "non-CodePen url ending with 'codepen.io' and having '/embed/'": {
      url: 'https://this-is-not-codepen.io/user/embed/123456',
      valid: false,
    },
    "non-CodePen url ending with 'codepen.io' and having '/pen/'": {
      url: 'https://this-is-not-codepen.io/user/pen/123456',
      valid: false,
    },
    'team page': {
      url: 'https://codepen.io/team/codepen',
      valid: false,
    },
    'user page': {
      url: 'https://codepen.io/MichaelDeBoey',
      valid: false,
    },
    'random page': {
      url: 'https://codepen.io/random-page',
      valid: false,
    },
    'blog url': {
      url: 'https://blog.codepen.io',
      valid: false,
    },
    "blog url with '/embed/'": {
      url: 'https://blog.codepen.io/user/embed/123456',
      valid: false,
    },
    "blog url with '/pen/'": {
      url: 'https://blog.codepen.io/user/pen/123456',
      valid: false,
    },
    'Pen embed url': {
      url: 'https://codepen.io/team/codepen/embed/PNaGbb',
      valid: false,
    },
    'Pen embed url with parameters': {
      url: 'https://codepen.io/team/codepen/embed/PNaGbb?default-tab=js',
      valid: false,
    },
    'Team Pen url': {
      url: 'https://codepen.io/team/codepen/pen/PNaGbb',
      valid: true,
    },
    "Team Pen url having 'www' subdomain": {
      url: 'https://www.codepen.io/team/codepen/pen/PNaGbb',
      valid: true,
    },
    'User Pen url': {
      url: 'https://codepen.io/chriscoyier/pen/owBwKM',
      valid: true,
    },
    "User Pen url having 'www' subdomain": {
      url: 'https://www.codepen.io/chriscoyier/pen/owBwKM',
      valid: true,
    },
  }
);

test('Gets the correct CodePen iframe', () => {
  const html = getHTML('https://codepen.io/team/codepen/pen/PNaGbb');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://codepen.io/team/codepen/embed/preview/PNaGbb\\" style=\\"width:100%; height:300px;\\"></iframe>"`
  );
});

test('Plugin can transform CodePen links', async () => {
  const markdownAST = getMarkdownASTForFile('CodePen');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<iframe src=\\"https://codepen.io/team/codepen/embed/preview/PNaGbb\\" style=\\"width:100%; height:300px;\\"></iframe>
    "
  `);
});
