import remark from 'remark';
import html from 'remark-html';
import remarkEmbedder from '../';

test('works with remark directly', async () => {
  const result = await remark()
    .use(remarkEmbedder)
    .use(html)
    .process('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  expect(result.toString()).toMatchInlineSnapshot(`
    <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

  `);
});

test('can pass options', async () => {
  const myCache = new Map();
  await remark()
    .use(remarkEmbedder, { cache: myCache })
    .use(html)
    .process('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  expect(myCache).toMatchInlineSnapshot(`
    Map {
      https://www.youtube.com/watch?v=dQw4w9WgXcQ => <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>,
    }
  `);
});
