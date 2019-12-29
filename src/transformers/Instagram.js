import { URL } from 'url';
import fetch from 'node-fetch';

export const shouldTransform = url => {
  const { host, pathname } = new URL(url);
  return (
    ['instagr.am', 'www.instagram.com', 'instagram.com'].includes(host) &&
    pathname.includes('/p/')
  );
};

export const getHTML = url => {
  return fetch(`https://api.instagram.com/oembed?url=${url}&omitscript=true`)
    .then(r => r.json())
    .then(
      r =>
        `<blockquote class="instagram-media" style="background:#FFF; border: 0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5) 0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; min-width:326px; padding:0;  width:99.375%;"><div style="padding:16px;> <a href="${url}" style="background:#FFFFFF; lineHeight:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank" rel="noopener noreferrer"> <div style="display: flex; flex-direction: row; align-items: center;"> <img src="${r.thumbnail_url}" alt="${r.title}" /></div><div style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"><div class="likes"> <div style="backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);" /><div style="backgroundColor: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flexGrow: 0; margin-right: 14px; margin-left: 2px;" /><div style="backgroundColor: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);" /></div><div class="comments" style="margin-left: 8px;"> <div style="background-color: #F4F4F4; border-radius: 50%; flexGrow: 0; height: 20px; width: 20px;" /><div style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #F4F4F4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg);" /></div><div class="bookmark" style="margin-left: auto;"> <div style="width: 0px; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);" /><div style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);" /><div style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);" /></div></div></a> <p style="margin:8px 0 0 0; padding:0 4px;"> <a href="${url}" style="color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none !important; word-wrap:break-word;" target="_blank" rel="noopener noreferrer">${r.title}</a></p><p style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; textA-aign:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="${r.author_url}" style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank" rel="noopener noreferrer">${r.author_name}</a></p></div></blockquote>`
    );
};
