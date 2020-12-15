import cases from 'jest-in-case';

import plugin from '../';

import {
  cache,
  getMarkdownASTForFile,
  mockCache,
  mdastToHtml,
} from './helpers';

describe('gatsby-remark-embedder', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('can transform all supported links (kitchensink)', async () => {
    mockCache({
      'https://giphy.com/gifs/howtogiphygifs-how-to-XatG8bioEwwVO': `<div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="https://giphy.com/embed/XatG8bioEwwVO" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed-from-cache" allowfullscreen></iframe></div>`,
      'https://instagram.com/p/B60jPE6J8U-': `<blockquote class="instagram-media-from-cache"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<time datetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>`,
      'https://streamable.com/moo': `<iframe class="streamable-embed-from-cache" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`,
      'https://twitter.com/kentcdodds/status/1078755736455278592': `<blockquote class="twitter-tweet-from-cache"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592">December 28, 2018</a></blockquote>`,
    });
    const markdownAST = getMarkdownASTForFile('kitchensink', true);

    const processedAST = await plugin(
      { cache, markdownAST },
      {
        services: {
          Instagram: {
            accessToken: 'access-token',
          },
          Twitch: {
            parent: 'embed.example.com',
          },
        },
      }
    );

    expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
      <h1>Heading 1</h1>
      <h2>Heading2</h2>
      <p>This is a normal paragraph.</p>
      <p>This is the first line of a multi-line paragraph.<br>
      And this is the second line.</p>
      <p>This is a paragraph with a <a href="https://example.com">link</a>.</p>
      <p><a href="https://example.com">example.com</a></p>
      <p><a href="https://example.com" title="A link to example.com">https://example.com</a></p>
      <p><a href="https://example.com">https://example.com</a></p>
      <p><a href="https://example.com"></a></p>
      <iframe src="https://codepen.io/team/codepen/embed/preview/PNaGbb" style="width:100%; height:300px;"></iframe>
      <iframe src="https://codesandbox.io/embed/ynn88nx9x?view=split" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
      <div style="width:100%;height:0;padding-bottom:63%;position:relative;"><iframe src="https://giphy.com/embed/XatG8bioEwwVO" width="100%" height="100%" style="position:absolute" frameborder="0" class="giphy-embed-from-cache" allowfullscreen></iframe></div>
      <blockquote class="instagram-media-from-cache"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<time datetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>
      <iframe src="https://lichess.org/embed/MPJcy1JW" width="600" height="397" frameborder="0"></iframe>
      <a data-pin-do="embedPin" href="https://pinterest.com/pin/99360735500167749"></a>
      <iframe src="https://slides.com/kentcdodds/oss-we-want/embed" width="576" height="420" scrolling="no" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen></iframe>
      <iframe width="100%" height="300" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player?url=https://soundcloud.com/clemenswenners/africa&#x26;color=ff5500&#x26;auto_play=false&#x26;hide_related=true&#x26;show_comments=true&#x26;show_user=true&#x26;show_reposts=false&#x26;show_teaser=false&#x26;visual=true"></iframe>
      <iframe src="https://open.spotify.com/embed/track/0It2bnTdLl2vyymzOkBI3L" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      <iframe class="streamable-embed-from-cache" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>
      <iframe src="https://testing-playground.com/embed/fb336c386145b235372a0f57d5c58205/6d13e4ee508301c8b42f9d2cc8584e70bb05fb4a?panes=query,preview" height="450" width="100%" scrolling="no" frameborder="0" allowtransparency="true" style="overflow: hidden; display: block; width: 100%"></iframe>
      <iframe src="https://player.twitch.tv?video=546761743&#x26;parent=embed.example.com" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
      <blockquote class="twitter-tweet-from-cache"><p lang="en" dir="ltr">example</p>— Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592">December 28, 2018</a></blockquote>
      <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    `);
  });

  test('logs when a transformer errors', async () => {
    const errorTransformer = {
      getHTML: () => {
        throw new Error('An error occurred in ErrorTransformer');
      },
      shouldTransform: () => true,
    };

    const markdownAST = getMarkdownASTForFile('ErrorTransformer', true);

    await expect(
      plugin({ cache, markdownAST }, { customTransformers: [errorTransformer] })
    ).rejects.toMatchInlineSnapshot(`
            [Error: The following error appeared while processing 'https://error-site.com/':

            An error occurred in ErrorTransformer]
          `);
  });

  cases(
    'passes service-specific options to the transformers',
    async ({ name, passedOptions }) => {
      const transformer = {
        getHTML: jest.fn(),
        name,
        shouldTransform: () => true,
      };

      const markdownAST = getMarkdownASTForFile('ServiceTransformer', true);

      await plugin(
        { cache, markdownAST },
        {
          customTransformers: [transformer],
          services: { serviceTransformer: { service: 'transformer' } },
        }
      );

      expect(transformer.getHTML).toHaveBeenCalledWith(
        'https://some-site.com/id/abc',
        passedOptions
      );
    },
    {
      'transformer with name': {
        name: 'serviceTransformer',
        passedOptions: { service: 'transformer' },
      },
      'transformer without name': {
        passedOptions: {},
      },
    }
  );
});
