import cases from 'jest-in-case';

import plugin from '../../';
import {
  getHTML,
  getTestingPlaygroundIFrameSrc,
  shouldTransform,
} from '../../transformers/TestingPlayground';

import { cache, getMarkdownASTForFile, mdastToHtml } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Testing Playground url': {
      url: 'https://not-a-testing-playground-url.com',
      valid: false,
    },
    "non-Testing Playground url ending with 'testing-playground.com'": {
      url: 'https://this-is-not-testing-playground.com',
      valid: false,
    },
    "non-Testing Playground url ending with 'testing-playground.com' having '/gist/' path": {
      url:
        'https://this-is-not-testing-playground.com/gist/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a',
      valid: false,
    },
    "non-Testing Playground url ending with 'testing-playground.com' and having '/embed/' path": {
      url:
        'https://this-is-not-testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a',
      valid: false,
    },
    'dnt policy page': {
      url: 'https://testing-playground.com/.well-known/dnt-policy.txt',
      valid: false,
    },
    'Playground embed url': {
      url:
        'https://testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a',
      valid: false,
    },
    'Testing Playground homepage': {
      url: 'https://testing-playground.com',
      valid: true,
    },
    'Playground url': {
      url:
        'https://testing-playground.com/gist/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a',
      valid: true,
    },
    "Playground url having 'www' subdomain": {
      url:
        'https://www.testing-playground.com/gist/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a',
      valid: true,
    },
  }
);

cases(
  'getTestingPlaygroundIFrameSrc',
  ({ url, iframe }) => {
    expect(getTestingPlaygroundIFrameSrc(url)).toBe(iframe);
  },
  {
    'Testing Playground homepage': {
      url: 'https://testing-playground.com',
      iframe: `https://testing-playground.com/embed?panes=query,preview`,
    },
    'Playground url': {
      url:
        'https://testing-playground.com/gist/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a',
      iframe: `https://testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a?panes=query,preview`,
    },
    "Playground url having 'www' subdomain": {
      url:
        'https://www.testing-playground.com/gist/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a',
      iframe: `https://testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a?panes=query,preview`,
    },
  }
);

test('Gets the correct Testing Playground iframe', () => {
  const html = getHTML(
    'https://testing-playground.com/gist/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a'
  );

  expect(html).toMatchInlineSnapshot(
    `<iframe src="https://testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a?panes=query,preview" height="450" width="100%" scrolling="no" frameBorder="0" allowTransparency="true" style="overflow: hidden; display: block; width: 100%"></iframe>`
  );
});

test('Plugin can transform Testing Playground links', async () => {
  const markdownAST = getMarkdownASTForFile('TestingPlayground');

  const processedAST = await plugin({ cache, markdownAST });

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://not-a-testing-playground-url.com</p>
    <p>https://this-is-not-testing-playground.com</p>
    <p>https://this-is-not-testing-playground.com/gist/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a</p>
    <p>https://this-is-not-testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a</p>
    <p>https://testing-playground.com/.well-known/dnt-policy.txt</p>
    <p>https://testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a</p>
    <iframe src="https://testing-playground.com/embed?panes=query,preview" height="450" width="100%" scrolling="no" frameborder="0" allowtransparency="true" style="overflow: hidden; display: block; width: 100%"></iframe>
    <iframe src="https://testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a?panes=query,preview" height="450" width="100%" scrolling="no" frameborder="0" allowtransparency="true" style="overflow: hidden; display: block; width: 100%"></iframe>
    <iframe src="https://testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a?panes=query,preview" height="450" width="100%" scrolling="no" frameborder="0" allowtransparency="true" style="overflow: hidden; display: block; width: 100%"></iframe>

  `);
});
