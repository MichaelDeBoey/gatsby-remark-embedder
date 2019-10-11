import { readFileSync } from 'fs';
import remark from 'remark';

import plugin from '..';

const markdown = readFileSync(`${__dirname}/__fixtures__/markdown.md`, 'utf8');
const markdownAST = remark.parse(markdown);

jest.mock('node-fetch', () =>
  jest.fn().mockResolvedValue({
    json: () =>
      Promise.resolve({
        html: `
          <blockquote class="twitter-tweet"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592?ref_src=twsrc%5Etfw">December 28, 2018</a></blockquote>
        `.trim(),
      }),
  })
);

const cache = {
  get: jest.fn(),
  set: jest.fn(),
};

describe('gatsby-remark-embedder', () => {
  it('can transform supported links', async () => {
    const processedAST = await plugin({ cache, markdownAST });

    expect(processedAST).toMatchSnapshot();
  });
});
