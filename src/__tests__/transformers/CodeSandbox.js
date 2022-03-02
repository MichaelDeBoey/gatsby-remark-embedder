import cases from 'jest-in-case';

import plugin from '../../';
import { getHTML, shouldTransform } from '../../transformers/CodeSandbox';

import { cache, getMarkdownASTForFile, mdastToHtml } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-CodeSandbox url': {
      url: 'https://not-a-codesandbox-url.com',
      valid: false,
    },
    "non-CodeSandbox url ending with 'codesandbox.io'": {
      url: 'https://this-is-not-codesandbox.io',
      valid: false,
    },
    "non-CodeSandbox url ending with 'codesandbox.io' having '/s/'": {
      url: 'https://this-is-not-codesandbox.io/s/ynn88nx9x',
      valid: false,
    },
    'embed url': {
      url: 'https://codesandbox.io/embed/ynn88nx9x',
      valid: false,
    },
    'Sandbox url': {
      url: 'https://codesandbox.io/s/ynn88nx9x',
      valid: true,
    },
    'Sandbox url with parameters': {
      url: 'https://codesandbox.io/s/ynn88nx9x?view=split',
      valid: true,
    },
    "Sandbox url having 'www' subdomain": {
      url: 'https://www.codesandbox.io/s/ynn88nx9x',
      valid: true,
    },
  }
);

test('Gets the correct CodeSandbox iframe', () => {
  const html = getHTML('https://codesandbox.io/s/ynn88nx9x');

  expect(html).toMatchInlineSnapshot(
    `<iframe src="https://codesandbox.io/embed/ynn88nx9x" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`
  );
});

test('Plugin can transform CodeSandbox links', async () => {
  const markdownAST = getMarkdownASTForFile('CodeSandbox');

  const processedAST = await plugin({ cache, markdownAST });

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://not-a-codesandbox-url.com</p>
    <p>https://this-is-not-codesandbox.io</p>
    <p>https://this-is-not-codesandbox.io/s/ynn88nx9x</p>
    <p>https://codesandbox.io/embed/ynn88nx9x</p>
    <iframe src="https://codesandbox.io/embed/ynn88nx9x" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
    <iframe src="https://codesandbox.io/embed/ynn88nx9x?view=split" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
    <iframe src="https://www.codesandbox.io/embed/ynn88nx9x" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>

  `);
});
