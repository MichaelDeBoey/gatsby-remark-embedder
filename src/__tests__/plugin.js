import plugin from '../';

import {
  cache,
  getMarkdownASTForFile,
  mockCache,
  parseASTToMarkdown,
} from './helpers';

describe('gatsby-remark-embedder', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('can transform all supported links (kitchensink)', async () => {
    mockCache({
      'https://instagram.com/p/B60jPE6J8U-': `<blockquote class="instagram-media-from-cache"><div><a href="https://instagram.com/p/B60jPE6J8U-"><p>example</p></a><p>A post shared by <a href="https://instagram.com/michaeldeboey">Michaël De Boey</a> (@michaeldeboey) on<timedatetime="2020-01-02T14:45:30+00:00">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>`,
      'https://streamable.com/moo': `<iframe class="streamable-embed-from-cache" src="https://streamable.com/o/moo" frameborder="0" scrolling="no" width="1920" height="1080" allowfullscreen></iframe>`,
      'https://twitter.com/kentcdodds/status/1078755736455278592': `<blockquote class="twitter-tweet-from-cache"><p lang="en" dir="ltr">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href="https://twitter.com/kentcdodds/status/1078755736455278592">December 28, 2018</a></blockquote>`,
    });
    const markdownAST = getMarkdownASTForFile('kitchensink', true);

    const processedAST = await plugin({ cache, markdownAST });

    expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
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

      <div style=\\"width:100%;height:0;padding-bottom:90%;position:relative;\\"><iframe src=\\"https://giphy.com/embed/4ZrZm6LoXmDZ7Pux3m\\" width=\\"100%\\" height=\\"100%\\" style=\\"position:absolute\\" frameBorder=\\"0\\" class=\\"giphy-embed\\" allowFullScreen></iframe></div><p><a href=\\"https://giphy.com/gifs/4ZrZm6LoXmDZ7Pux3m\\">via GIPHY</a></p>

      <blockquote class=\\"instagram-media-from-cache\\"><div><a href=\\"https://instagram.com/p/B60jPE6J8U-\\"><p>example</p></a><p>A post shared by <a href=\\"https://instagram.com/michaeldeboey\\">Michaël De Boey</a> (@michaeldeboey) on<timedatetime=\\"2020-01-02T14:45:30+00:00\\">Jan 2, 2020 at 6:45am PST</time></p></div></blockquote>

      <iframe src=\\"https://lichess.org/embed/MPJcy1JW\\" width=\\"600\\" height=\\"397\\" frameborder=\\"0\\"></iframe>

      <iframe src=\\"https://slides.com/kentcdodds/oss-we-want/embed\\" width=\\"576\\" height=\\"420\\" scrolling=\\"no\\" frameborder=\\"0\\" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

      <iframe width=\\"100%\\" height=\\"300\\" scrolling=\\"no\\" frameborder=\\"no\\" src=https://w.soundcloud.com/player?url=https://soundcloud.com/clemenswenners/africa&color=ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true></iframe>

      <iframe src=\\"https://open.spotify.com/embed/track/0It2bnTdLl2vyymzOkBI3L\\" width=\\"100%\\" height=\\"380\\" frameborder=\\"0\\" allowtransparency=\\"true\\" allow=\\"encrypted-media\\"></iframe>

      <iframe class=\\"streamable-embed-from-cache\\" src=\\"https://streamable.com/o/moo\\" frameborder=\\"0\\" scrolling=\\"no\\" width=\\"1920\\" height=\\"1080\\" allowfullscreen></iframe>

      <blockquote class=\\"twitter-tweet-from-cache\\"><p lang=\\"en\\" dir=\\"ltr\\">example</p>&mdash; Kent C. Dodds (@kentcdodds) <a href=\\"https://twitter.com/kentcdodds/status/1078755736455278592\\">December 28, 2018</a></blockquote>

      <iframe width=\\"100%\\" height=\\"315\\" src=\\"https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0\\" frameBorder=\\"0\\" allow=\\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\\" allowFullScreen></iframe>
      "
    `);
  });
});
