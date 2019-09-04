import cases from 'jest-in-case';

import { getHTML, shouldTransform } from '../soundcloud';

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-soundcloud url': {
      url: 'https://not-a-soundcloud-url.com',
      valid: false,
    },
    'url with soundcloud track id': {
      url: 'https://api.soundcloud.com/tracks/151129490',
      valid: false,
    },
    'url with soundcloud playlist id': {
      url: 'https://api.soundcloud.com/playlists/703823211',
      valid: false,
    },
    'url with widget soundcloud subdomain': {
      url:
        'https://w.soundcloud.com/player/?url=https://soundcloud.com/clemenswenners/africa',
      valid: false,
    },
    'soundcloud full-name url': {
      url: 'https://soundcloud.com/clemenswenners/africa',
      valid: true,
    },
  }
);

test('Gets the correct Soundcloud iframe', async () => {
  const html = await getHTML('https://soundcloud.com/clemenswenners/africa');

  expect(html).toMatchInlineSnapshot(
    `"<iframe width=\\"100%\\" height=\\"300\\" scrolling=\\"no\\" frameborder=\\"no\\" allow=\\"autoplay\\" src=https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fclemenswenners%2Fafrica&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true></iframe>"`
  );
});
