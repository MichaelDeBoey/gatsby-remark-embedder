import cases from 'jest-in-case';

import { getHTML, shouldTransform, getSpotifyIframeSrc } from '../Spotify';

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
      url: 'https://this-is-not-open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3',
      valid: false,
    },
    'embed Album url': {
      url: 'https://open.spotfy.com/embed/album/1DFixLWuPkv3KT3TnV35m3',
      valid: false,
    },
    'album url': {
      url: 'https://open.spotify.com/album/1DFixLWuPkv3KT3TnV35m3',
      valid: true,
    },
    "non-Spotify url ending with 'open.spotify.com' having '/track/'": {
      url: 'https://this-is-not-open.spotify.com/track/4Dg5moVCTqxAb7Wr8Dq2T5',
      valid: false,
    },
    'embed track url': {
      url: 'https://open.spotfy.com/embed/track/4Dg5moVCTqxAb7Wr8Dq2T5',
      valid: false,
    },
    'track url': {
      url: 'https://open.spotify.com/track/4Dg5moVCTqxAb7Wr8Dq2T5',
      valid: true,
    },
    "non-Spotify url ending with 'open.spotify.com' having '/playlist/'": {
      url:
        'https://this-is-not-open.spotify.com/playlist/37i9dQZF1DX5wDmLW735Yd',
      valid: false,
    },
    'embed playlist url': {
      url: 'https://open.spotfy.com/embed/playlist/37i9dQZF1DX5wDmLW735Yd',
      valid: false,
    },
    'playlist url': {
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX5wDmLW735Yd',
      valid: true,
    },
    "non-Spotify url ending with 'open.spotify.com' having '/show/'": {
      url: 'https://this-is-not-open.spotify.com/show/7GkO2poedjbltWT5lduL5w',
      valid: false,
    },
    'embed show url': {
      url: 'https://open.spotfy.com/embed/show/7GkO2poedjbltWT5lduL5w',
      valid: false,
    },
    'show url': {
      url: 'https://open.spotify.com/show/7GkO2poedjbltWT5lduL5w',
      valid: true,
    },
    "non-Spotify url ending with 'open.spotify.com' having '/artist/'": {
      url: 'https://this-is-not-open.spotify.com/artist/0QaSiI5TLA4N7mcsdxShDO',
      valid: false,
    },
    'embed artist url': {
      url: 'https://open.spotfy.com/embed/artist/0QaSiI5TLA4N7mcsdxShDO',
      valid: false,
    },
    'artist url': {
      url: 'https://open.spotify.com/artist/0QaSiI5TLA4N7mcsdxShDO',
      valid: true,
    },
    "non-Spotify url ending with 'open.spotify.com' having '/episode/'": {
      url:
        'https://this-is-not-open.spotify.com/episode/0j9RE1H47GSmBnRqOtf1dx',
      valid: false,
    },
    'embed episode url': {
      url: 'https://open.spotfy.com/embed/episode/0j9RE1H47GSmBnRqOtf1dx',
      valid: false,
    },
    'episode url': {
      url: 'https://open.spotify.com/episode/0j9RE1H47GSmBnRqOtf1dx',
      valid: true,
    },
  }
);

cases(
  'get spotify iframe',
  ({ url, iframe }) => {
    expect(getSpotifyIframeSrc(url)).toBe(iframe);
  },
  {
    'album url': {
      url: 'https://open.spotify.com/album/254Y0CD07dB40q84db89EB',
      iframe: 'https://open.spotify.com/embed/album/254Y0CD07dB40q84db89EB',
    },
    'artist url': {
      url: 'https://open.spotify.com/artist/0QaSiI5TLA4N7mcsdxShDO',
      iframe: 'https://open.spotify.com/embed/artist/0QaSiI5TLA4N7mcsdxShDO',
    },
    'show url': {
      url: 'https://open.spotify.com/show/7GkO2poedjbltWT5lduL5w',
      iframe: 'https://open.spotify.com/embed/show/7GkO2poedjbltWT5lduL5w',
    },
    'playlist url': {
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX5wDmLW735Yd',
      iframe: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX5wDmLW735Yd',
    },
    'episode url': {
      url: 'https://open.spotify.com/episode/0j9RE1H47GSmBnRqOtf1dx',
      iframe: 'https://open.spotify.com/embed/episode/0j9RE1H47GSmBnRqOtf1dx',
    },
    'track url': {
      url: 'https://open.spotify.com/track/0It2bnTdLl2vyymzOkBI3L',
      iframe: 'https://open.spotify.com/embed/track/0It2bnTdLl2vyymzOkBI3L',
    },
  }
);

test('Gets the correct Spotify iframe for Track', () => {
  const html = getHTML('https://open.spotify.com/track/4Dg5moVCTqxAb7Wr8Dq2T5');

  expect(html).toMatchInlineSnapshot(
    `"<iframe src=\\"https://open.spotify.com/embed/track/4Dg5moVCTqxAb7Wr8Dq2T5\\" style=\\"width:100%; height:240px; border:0;\\" frameborder=\\"0\\" allowtransparency=\\"true\\" allow=\\"encrypted-media\\"></iframe>"`
  );
});
