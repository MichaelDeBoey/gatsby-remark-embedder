import cases from 'jest-in-case';

import { getHTML, shouldTransform } from '../Spotify';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Spotify url': {
      url: 'https://not-a-spotify-url.com',
      valid: false,
    },
    "non-Spotify url ending with 'open.spotify.com'": {
      url: 'https://this-is-not-open.spotify.com',
      valid: false,
    },
    "non-Spotify url ending with 'open.spotify.com' having '/album/'": {
      url: 'https://this-is-not-open.spotify.com/album/ynn88nx9x',
      valid: false,
    },
    'embed url': {
      url: 'https://open.spotfy.com/embed/album/1DFixLWuPkv3KT3TnV35m3',
      valid: false,
    },
    'Album url': {
      url: 'https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3',
      valid: true,
    },
  }
);

test('Gets the correct Spotify iframe', () => {
  const html = getHTML('https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3\\" style=\\"width:100%; height:400px; border:0;\\" frameborder=\\"0\\" allowtransparency=\\"true\\" allow=\\"encrypted-media\\"></iframe>"`
  );
});
