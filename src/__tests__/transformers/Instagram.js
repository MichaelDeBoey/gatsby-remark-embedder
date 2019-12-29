import cases from 'jest-in-case';
import fetchMock from 'node-fetch';

import plugin from '../..';
import { getHTML, shouldTransform } from '../../transformers/Instagram';

import { cache, getMarkdownASTForFile, parseASTToMarkdown } from '../helpers';

jest.mock('node-fetch', () => jest.fn());

const mockFetch = html =>
  fetchMock.mockResolvedValue({ json: () => Promise.resolve({ html }) });

beforeEach(() => {
  fetchMock.mockClear();
});

cases(
  'url validation',
  ({ url, valid }) => {
    expect(shouldTransform(url)).toBe(valid);
  },
  {
    'non-Instagram url': {
      url: 'https://not-an-instagram-url.com',
      valid: false,
    },
    "non-Instagram url ending with 'instagram.com'": {
      url: 'https://this-is-not-instagram.com',
      valid: false,
    },
    "non-Instagram url ending with 'instagram.com' and having '/p/'": {
      url: 'https://this-is-not-instagram.com/p/123',
      valid: false,
    },
    "non-Instagram url ending with 'instagr.am/'": {
      url: 'https://this-is-not-instagr.am/',
      valid: false,
    },
    'profile url': {
      url: 'https://instagram.com/FabioRosado',
      valid: false,
    },
    'image url': {
      url: 'https://instagram.com/p/B39qQ_GJ_kE/',
      valid: true,
    },
    "status url having 'www' subdomain": {
      url: 'https://www.instagram.com/p/B39qQ_GJ_kE/',
      valid: true,
    },
    "image url with 'instagr.am'": {
      url: 'https://instagram.com/p/B39qQ_GJ_kE/',
      valid: true,
    },
  }
);

test('Gets the correct Instagram iframe', async () => {
  mockFetch({
    title:
      'How to not love this view? It makes you feel that everything is possible.\n\n#flying #sky #mountains #windowseat #windowview #photooftheday #travel #traveling #travelgram',
    author_name: 'fabiorosado',
    author_url: 'https://www.instagram.com/fabiorosado',
    thumbnail_url:
      'https://scontent-lhr8-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/74970739_536771447108395_8492814323986392530_n.jpg?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=107&_nc_ohc=ZH42xZBjqPMAX9nP4Wm&oh=ab95a5296b26335ec3de38f4574e51e2&oe=5EA64C2D',
  });

  const html = await getHTML('https://www.instagram.com/p/B39qQ_GJ_kE/');

  expect(html).toMatchInlineSnapshot(
    `"<blockquote class=\\"instagram-media\\" style=\\"background:#FFF; border: 0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5) 0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0;  width:99.375%;\\"><div style=\\"padding:16px;> <a href=\\"https://www.instagram.com/p/B39qQ_GJ_kE/\\" style=\\"background:#FFFFFF; lineHeight:0; padding:0 0; text-align:center; text-decoration:none; width:100%;\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\"> <div style=\\"display: flex; flex-direction: row; align-items: center;\\"> <img src=\\"undefined\\" alt=\\"undefined\\" /></div><div style=\\"display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;\\"><div class=\\"likes\\"> <div style=\\"backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);\\" /><div style=\\"backgroundColor: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flexGrow: 0; margin-right: 14px; margin-left: 2px;\\" /><div style=\\"backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);\\" /></div><div class=\\"comments\\" style=\\"margin-left: 8px;\\"> <div style=\\"background-color: #F4F4F4; border-radius: 50%; flexGrow: 0; height: 20px; width: 20px;\\" /><div style=\\"width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #F4F4F4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg);\\" /></div><div class=\\"bookmark\\" style=\\"margin-left: auto;\\"> <div style=\\"width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);\\" /><div style=\\"background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);\\" /><div style=\\"width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);\\" /></div></div></a> <p style=\\"margin:8px 0 0 0; padding:0 4px;\\"> <a href=\\"https://www.instagram.com/p/B39qQ_GJ_kE/\\" style=\\"color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none !important; word-wrap:break-word;\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">undefined</a></p><p style=\\"color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; textA-aign:center; text-overflow:ellipsis; white-space:nowrap;\\">A post shared by <a href=\\"undefined\\" style=\\"color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\">undefined</a></p></div></blockquote>"`
  );
});

test('Plugin can transform Instagram links', async () => {
  mockFetch({
    title:
      'How to not love this view? It makes you feel that everything is possible.\n\n#flying #sky #mountains #windowseat #windowview #photooftheday #travel #traveling #travelgram',
    author_name: 'fabiorosado',
    author_url: 'https://www.instagram.com/fabiorosado',
    thumbnail_url:
      'https://scontent-lhr8-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/s640x640/74970739_536771447108395_8492814323986392530_n.jpg?_nc_ht=scontent-lhr8-1.cdninstagram.com&_nc_cat=107&_nc_ohc=ZH42xZBjqPMAX9nP4Wm&oh=ab95a5296b26335ec3de38f4574e51e2&oe=5EA64C2D',
  });
  const markdownAST = getMarkdownASTForFile('Instagram');

  const processedAST = await plugin({ cache, markdownAST });

  expect(parseASTToMarkdown(processedAST)).toMatchInlineSnapshot(`
    "<https://not-an-instagram-url.com>

    <https://this-is-not-instagram.com>

    <https://this-is-not-instagram.com/foobar/status/123>

    <https://www.instagram.com/FabioRosado>

    <blockquote class="instagram-media" style="background:#FFF; border: 0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5) 0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0;  width:99.375%;"><div style="padding:16px;> <a href="https://www.instagram.com/p/B39qQ_GJ_kE/" style="background:#FFFFFF; lineHeight:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank" rel="noopener noreferrer"> <div style="display: flex; flex-direction: row; align-items: center;"> <img src="undefined" alt="undefined" /></div><div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div class="likes"> <div style="backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);" /><div style="backgroundColor: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flexGrow: 0; margin-right: 14px; margin-left: 2px;" /><div style="backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);" /></div><div class="comments" style="margin-left: 8px;"> <div style="background-color: #F4F4F4; border-radius: 50%; flexGrow: 0; height: 20px; width: 20px;" /><div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #F4F4F4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg);" /></div><div class="bookmark" style="margin-left: auto;"> <div style="width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);" /><div style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);" /><div style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);" /></div></div></a> <p style="margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/B39qQ_GJ_kE/" style="color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none !important; word-wrap:break-word;" target="_blank" rel="noopener noreferrer">undefined</a></p><p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; textA-aign:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="undefined" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank" rel="noopener noreferrer">undefined</a></p></div></blockquote>

    <blockquote class="instagram-media" style="background:#FFF; border: 0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5) 0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0;  width:99.375%;"><div style="padding:16px;> <a href="https://instagram.com/p/B39qQ_GJ_kE/" style="background:#FFFFFF; lineHeight:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank" rel="noopener noreferrer"> <div style="display: flex; flex-direction: row; align-items: center;"> <img src="undefined" alt="undefined" /></div><div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div class="likes"> <div style="backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);" /><div style="backgroundColor: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flexGrow: 0; margin-right: 14px; margin-left: 2px;" /><div style="backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);" /></div><div class="comments" style="margin-left: 8px;"> <div style="background-color: #F4F4F4; border-radius: 50%; flexGrow: 0; height: 20px; width: 20px;" /><div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #F4F4F4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg);" /></div><div class="bookmark" style="margin-left: auto;"> <div style="width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);" /><div style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);" /><div style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);" /></div></div></a> <p style="margin:8px 0 0 0; padding:0 4px;"> <a href="https://instagram.com/p/B39qQ_GJ_kE/" style="color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none !important; word-wrap:break-word;" target="_blank" rel="noopener noreferrer">undefined</a></p><p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; textA-aign:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="undefined" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank" rel="noopener noreferrer">undefined</a></p></div></blockquote>

    <blockquote class="instagram-media" style="background:#FFF; border: 0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5) 0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0;  width:99.375%;"><div style="padding:16px;> <a href="https://instagr.am/p/B39qQ_GJ_kE/" style="background:#FFFFFF; lineHeight:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank" rel="noopener noreferrer"> <div style="display: flex; flex-direction: row; align-items: center;"> <img src="undefined" alt="undefined" /></div><div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div class="likes"> <div style="backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);" /><div style="backgroundColor: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flexGrow: 0; margin-right: 14px; margin-left: 2px;" /><div style="backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);" /></div><div class="comments" style="margin-left: 8px;"> <div style="background-color: #F4F4F4; border-radius: 50%; flexGrow: 0; height: 20px; width: 20px;" /><div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #F4F4F4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg);" /></div><div class="bookmark" style="margin-left: auto;"> <div style="width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);" /><div style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);" /><div style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);" /></div></div></a> <p style="margin:8px 0 0 0; padding:0 4px;"> <a href="https://instagr.am/p/B39qQ_GJ_kE/" style="color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none !important; word-wrap:break-word;" target="_blank" rel="noopener noreferrer">undefined</a></p><p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; textA-aign:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="undefined" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank" rel="noopener noreferrer">undefined</a></p></div></blockquote>
    "
  `);
});
