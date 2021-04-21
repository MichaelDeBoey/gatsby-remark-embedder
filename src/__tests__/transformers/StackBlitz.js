import cases from 'jest-in-case';

import plugin from '../../';
import { getHTML, shouldTransform } from '../../transformers/StackBlitz';

import { cache, getMarkdownASTForFile, mdastToHtml } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-StackBlitz url': {
      url: 'https://not-a-stackblitz-url.com',
      valid: false,
    },
    "non-StackBlitz url ending with 'stackblitz.com'": {
      url: 'https://this-is-not-stackblitz.com',
      valid: false,
    },
    "non-CodeSandbox url ending with 'stackblitz.com' having '/edit/'": {
      url: 'https://this-is-not-stackblitz.com/edit/start-to-source-1-ng-template',
      valid: false,
    },
    'embed url': {
      url: 'https://stackblitz.com/edit/start-to-source-1-ng-template',
      valid: true,
    },
    'embed url with parameters': {
      url: 'https://stackblitz.com/edit/start-to-source-1-ng-template?file=src/app/app.component.ts',
      valid: true,
    },
  }
);

test('Gets the correct StackBlitz iframe', () => {
  const html = getHTML('https://stackblitz.com/edit/start-to-source-1-ng-template');

  expect(html).toMatchInlineSnapshot(
    `<iframe src="https://stackblitz.com/edit/start-to-source-1-ng-template?embed=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`
  );
});

test('Plugin can transform StackBlitz links', async () => {
  const markdownAST = getMarkdownASTForFile('StackBlitz');

  const processedAST = await plugin({ cache, markdownAST });

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://not-a-stackblitz-url.com</p>
    <p>https://this-is-not-stackblitz.com</p>
    <p>https://this-is-not-stackblitz.com/edit/start-to-source-1-ng-template</p>
    <iframe src="https://stackblitz.com/edit/start-to-source-1-ng-template?embed=1" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
    <iframe src="https://stackblitz.com/edit/start-to-source-1-ng-template?embed=1&file=src/app/app.component.ts" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

  `);
});
