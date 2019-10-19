import cases from 'jest-in-case';

import { getHTML, shouldTransform } from '../CodeSandbox';

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
    "Sandbox url having 'www' subdomain": {
      url: 'https://www.codesandbox.io/s/ynn88nx9x',
      valid: true,
    },
  }
);

test('Gets the correct CodeSandbox iframe', () => {
  const html = getHTML('https://codesandbox.io/s/ynn88nx9x');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://codesandbox.io/embed/ynn88nx9x\\" style=\\"width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;\\" sandbox=\\"allow-modals allow-forms allow-popups allow-scripts allow-same-origin\\"></iframe>"`
  );
});
