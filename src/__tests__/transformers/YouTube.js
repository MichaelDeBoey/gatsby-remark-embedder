import cases from 'jest-in-case';

import plugin from '../../';
import {
  getHTML,
  getTimeValueInSeconds,
  getYouTubeIFrameSrc,
  shouldTransform,
} from '../../transformers/YouTube';

import { cache, getMarkdownASTForFile, mdastToHtml } from '../helpers';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-YouTube url': {
      url: 'https://not-a-youtube-url.com',
      valid: false,
    },
    "non-YouTube url ending with 'youtu.be'": {
      url: 'https://this-is-not-youtu.be',
      valid: false,
    },
    "non-YouTube url ending with 'youtube.com'": {
      url: 'https://this-is-not-youtube.com',
      valid: false,
    },
    "non-YouTube url ending with 'youtube.com' and having a valid video path": {
      url: 'https://this-is-not-youtube.com/watch?v=dQw4w9WgXcQ',
      valid: false,
    },
    'short url': {
      url: 'https://youtu.be/dQw4w9WgXcQ',
      valid: true,
    },
    'http short url': {
      url: 'http://youtu.be/dQw4w9WgXcQ',
      valid: true,
    },
    'full url': {
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      valid: true,
    },
    "full url having 'www' subdomain": {
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      valid: true,
    },
    'http full url': {
      url: 'http://youtube.com/watch?v=dQw4w9WgXcQ',
      valid: true,
    },
    'channel full url': {
      url: 'https://youtube.com/channel/UCXBhQ05nu3L1abBUGeQ0ahw',
      valid: false,
    },
    'channel short url': {
      url: 'https://youtube.com/c/KentCDodds-vids',
      valid: false,
    },
    'playlist url': {
      url:
        'https://youtube.com/playlist?list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u',
      valid: false,
    },
    'user full url': {
      url: 'https://youtube.com/user/kentdoddsfamily',
      valid: false,
    },
    'user short url': {
      url: 'https://youtube.com/kentdoddsfamily',
      valid: false,
    },
  }
);

cases(
  'getYouTubeIFrameSrc',
  ({ url, iframe }) => {
    expect(getYouTubeIFrameSrc(url)).toBe(iframe);
  },
  {
    'short url': {
      url: 'https://youtu.be/dQw4w9WgXcQ',
      iframe: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',
    },
    'http short url': {
      url: 'http://youtu.be/dQw4w9WgXcQ',
      iframe: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',
    },
    'with list and time params': {
      url: 'https://youtu.be/dQw4w9WgXcQ?list=123&t=23',
      iframe:
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&list=123&start=23',
    },
    'full url': {
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      iframe: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',
    },
    'http full url': {
      url: 'http://youtube.com/watch?v=dQw4w9WgXcQ',
      iframe: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0',
    },
    'full url with list param': {
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ&list=123',
      iframe:
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&list=123',
    },
    'full url with list and time param': {
      url: 'https://youtube.com/watch?v=dQw4w9WgXcQ&t=123',
      iframe:
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&start=123',
    },
    'time with seconds': {
      url: 'https://youtu.be/dQw4w9WgXcQ?t=23s',
      iframe:
        'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&start=23',
    },
  }
);

cases(
  'getTimeValueInSeconds',
  ({ value, seconds }) => {
    expect(getTimeValueInSeconds(value)).toBe(seconds);
  },
  [
    { value: '23s', seconds: '23' },
    { value: '2m1s', seconds: '121' },
    { value: '1h', seconds: '3600' },
    { value: '1h1m1s', seconds: '3661' },
  ].map((opts) => ({
    ...opts,
    name: `${opts.value} -> ${opts.seconds}`,
  }))
);

test('Gets the correct YouTube iframe', async () => {
  const html = await getHTML('https://youtu.be/dQw4w9WgXcQ');

  expect(html).toMatchInlineSnapshot(
    `<iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`
  );
});

test('Plugin can transform YouTube links', async () => {
  const markdownAST = getMarkdownASTForFile('YouTube');

  const processedAST = await plugin({ cache, markdownAST });

  expect(mdastToHtml(processedAST)).toMatchInlineSnapshot(`
    <p>https://not-a-youtube-url.com</p>
    <p>https://this-is-not-youtu.be</p>
    <p>https://this-is-not-youtube.com</p>
    <p>https://this-is-not-youtube.com/watch?v=dQw4w9WgXcQ</p>
    <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <iframe width="100%" height="315" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    <p>https://youtube.com/channel/UCXBhQ05nu3L1abBUGeQ0ahw</p>
    <p>https://youtube.com/c/ReactRally</p>
    <p>https://youtube.com/playlist?list=PLV5CVI1eNcJgCrPH_e6d57KRUTiDZgs0u</p>
    <p>https://youtube.com/user/kentdoddsfamily</p>
    <p>https://youtube.com/kentdoddsfamily</p>

  `);
});
