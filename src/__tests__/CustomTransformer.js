import plugin from '../';

import { cache, getMarkdownASTForFile, mdastToHtml } from './helpers';

const transformer = {
  shouldTransform: jest.fn((url) => url.startsWith('https://some-site.com')),
  getHTML: jest.fn((url) => `<iframe src="${url}"></iframe>`),
};

test('Plugin can transform CustomTransformer links', async () => {
  const markdownAST = getMarkdownASTForFile('CustomTransformer', true);

  const processedAST = await plugin(
    { cache, markdownAST },
    { customTransformers: [transformer] }
  );

  expect(transformer.shouldTransform).toHaveBeenCalledTimes(2);
  expect(transformer.shouldTransform).toHaveBeenCalledWith(
    'https://some-site.com/id/abc'
  );
  expect(transformer.shouldTransform).toHaveBeenCalledWith(
    'https://some-other-site.com/id/abc'
  );

  expect(transformer.getHTML).toHaveBeenCalledTimes(1);

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://some-other-site.com/id/abc</p>
    <iframe src="https://some-site.com/id/abc"></iframe>

  `);
});
