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
    expect(remark.stringify(processedAST)).toMatchInlineSnapshot(`
      "# Heading 1

      ## Heading2

      This is a normal paragraph.

      This is the first line of a multi-line paragraph.  
      And this is the second line.

      This is a paragraph with a [link](https://example.com).

      [example.com](https://example.com)

      [https://example.com](https://example.com \\"A link to example.com\\")

      <https://example.com>

      <iframe src=\\"https://codepen.io/team/codepen/embed/preview/PNaGbb\\" style=\\"width:100%; height:300px;\\"></iframe>

      <iframe src=\\"https://codesandbox.io/embed/ynn88nx9x?view=split\\" style=\\"width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;\\" allow=\\"geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb\\" sandbox=\\"allow-modals allow-forms allow-popups allow-scripts allow-same-origin\\"></iframe>

      <iframe src=\\"https://slides.com/kentcdodds/oss-we-want/embed\\" width=\\"576\\" height=\\"420\\" scrolling=\\"no\\" frameborder=\\"0\\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

      <iframe width=\\"100%\\" height=\\"300\\" scrolling=\\"no\\" frameborder=\\"no\\" src=https://w.soundcloud.com/player?url=https://soundcloud.com/clemenswenners/africa&color=ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true></iframe>

      <iframe src=\\"https://open.spotify.com/embed/track/0It2bnTdLl2vyymzOkBI3L\\" width=\\"100%\\" height=\\"380\\" frameborder=\\"0\\" allowtransparency=\\"true\\" allow=\\"encrypted-media\\"></iframe>

      <blockquote class=\\"twitter-tweet-from-cache\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592?ref_src=twsrc%5Etfw\\">December 28, 2018</a></blockquote>

      <iframe width=\\"100%\\" height=\\"315\\" src=\\"https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0\\" frameBorder=\\"0\\" allow=\\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\\" allowFullScreen></iframe>
      "
    `);
  });

  it('can transform CodeSandbox links', async () => {
    const markdownAST = getMarkdownASTForFile('CodeSandbox');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
    expect(remark.stringify(processedAST)).toMatchInlineSnapshot(`
      "<iframe src=\\"https://codesandbox.io/embed/ynn88nx9x?view=split\\" style=\\"width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;\\" allow=\\"geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb\\" sandbox=\\"allow-modals allow-forms allow-popups allow-scripts allow-same-origin\\"></iframe>
      "
    `);
  });

  it('can transform Slides links', async () => {
    const markdownAST = getMarkdownASTForFile('Slides');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
    expect(remark.stringify(processedAST)).toMatchInlineSnapshot(`
      "<iframe src=\\"https://slides.com/kentcdodds/oss-we-want/embed\\" width=\\"576\\" height=\\"420\\" scrolling=\\"no\\" frameborder=\\"0\\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
      "
    `);
  });

  it('can transform SoundCloud links', async () => {
    const markdownAST = getMarkdownASTForFile('SoundCloud');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
    expect(remark.stringify(processedAST)).toMatchInlineSnapshot(`
      "<iframe width=\\"100%\\" height=\\"300\\" scrolling=\\"no\\" frameborder=\\"no\\" src=https://w.soundcloud.com/player?url=https://soundcloud.com/clemenswenners/africa&color=ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true></iframe>
      "
    `);
  });

  it('can transform Spotify links', async () => {
    const markdownAST = getMarkdownASTForFile('Spotify');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
    expect(remark.stringify(processedAST)).toMatchInlineSnapshot(`
      "<iframe src=\\"https://open.spotify.com/embed/track/0It2bnTdLl2vyymzOkBI3L\\" width=\\"100%\\" height=\\"380\\" frameborder=\\"0\\" allowtransparency=\\"true\\" allow=\\"encrypted-media\\"></iframe>
      "
    `);
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
    expect(remark.stringify(processedAST)).toMatchInlineSnapshot(`
      "<blockquote class=\\"twitter-tweet-mocked-fetch\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592\\">December 28, 2018</a></blockquote>
      "
    `);
  });

  it('can transform YouTube links', async () => {
    const markdownAST = getMarkdownASTForFile('YouTube');

    const processedAST = await plugin({ cache, markdownAST });

    expect(remark.stringify(processedAST)).toMatchSnapshot();
    expect(remark.stringify(processedAST)).toMatchInlineSnapshot(`
      "<iframe width=\\"100%\\" height=\\"315\\" src=\\"https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0\\" frameBorder=\\"0\\" allow=\\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\\" allowFullScreen></iframe>
      "
    `);
  });

  it('can execute custom transformers', async () => {
    const markdownAST = getMarkdownASTForFile('CustomTransformer');

    const transformer = {
      shouldTransform: jest.fn(url => url.startsWith('https://some-site.com')),
      getHTML: jest.fn(url => `<iframe src="${url}"></iframe>`),
    };

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

    expect(remark.stringify(processedAST)).toMatchSnapshot();
    expect(remark.stringify(processedAST)).toMatchInlineSnapshot(`
      "<iframe src=\\"https://some-site.com/id/abc\\"></iframe>

      <https://some-other-site.com/id/abc>
      "
    `);
  });
});
