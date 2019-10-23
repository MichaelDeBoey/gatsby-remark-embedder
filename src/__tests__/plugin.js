import { readFileSync } from 'fs';
import fetchMock from 'node-fetch';
import remark from 'remark';

import plugin from '..';

const readMarkdownFile = fileName =>
  readFileSync(`${__dirname}/__fixtures__/${fileName}.md`, 'utf8');
const getMarkdownASTForFile = filename =>
  remark.parse(readMarkdownFile(filename));

const mockCacheGet = ({ urlToMock, returnValue }) => urlString => {
  if (urlString === urlToMock) {
    return returnValue;
  }

  return undefined;
};

const cache = {
  get: jest.fn(),
  set: jest.fn(),
};

jest.mock('node-fetch', () => jest.fn());

describe('gatsby-remark-embedder', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('can transform all supported links (kitchensink)', async () => {
    cache.get.mockImplementation(
      mockCacheGet({
        urlToMock: 'https://twitter.com/kentcdodds/status/1078755736455278592',
        returnValue: `<blockquote class="twitter-tweet-from-cache"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592?ref_src=twsrc%5Etfw">December 28, 2018</a></blockquote>`,
      })
    );
    const markdownAST = getMarkdownASTForFile('kitchensink');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
  });

  it('can transform CodePen links', async () => {
    const markdownAST = getMarkdownASTForFile('CodePen');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
  });

  it('can transform CodeSandbox links', async () => {
    const markdownAST = getMarkdownASTForFile('CodeSandbox');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
  });

  it('can transform Slides links', async () => {
    const markdownAST = getMarkdownASTForFile('Slides');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
  });

  it('can transform SoundCloud links', async () => {
    const markdownAST = getMarkdownASTForFile('SoundCloud');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
  });

  it('can transform Twitter links', async () => {
    fetchMock.mockResolvedValue({
      json: () =>
        Promise.resolve({
          html: `
          <blockquote class="twitter-tweet-mocked-fetch"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592?ref_src=twsrc%5Etfw">December 28, 2018</a></blockquote>
        `.trim(),
        }),
    });
    const markdownAST = getMarkdownASTForFile('Twitter');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
  });

  it('can transform YouTube links', async () => {
    const markdownAST = getMarkdownASTForFile('YouTube');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
  });
});
