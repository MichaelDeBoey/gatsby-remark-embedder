import remark from 'remark';
import { remarkEmbedder } from '../';

test('works with remark directly', async () => {
  const result = await remark()
    .use(remarkEmbedder)
    .process('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  expect(result.toString()).toMatchInlineSnapshot(`
    "<iframe width=\\"100%\\" height=\\"315\\" src=\\"https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0\\" frameBorder=\\"0\\" allow=\\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\\" allowFullScreen></iframe>
    "
  `);
});
