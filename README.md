<div align="center">
<img width="450" height="76" src="https://raw.githubusercontent.com/MichaelDeBoey/gatsby-remark-embedder/master/art/logo.png" alt="gatsby-remark-embedder logo" />

<h1>gatsby-remark-embedder</h1>

<p>Gatsby Remark plugin to embed well known services by their URL.</p>
</div>

---

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-19-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
[![PRs Welcome][prs-badge]][prs]
[![Code of Conduct][coc-badge]][coc]
<!-- prettier-ignore-end -->

## The problem

Trying to embed well known services (like [CodePen][codepen],
[CodeSandbox][codesandbox], [GIPHY][giphy], [Instagram][instagram],
[Lichess][lichess], [Pinterest][pinterest], [Slides][slides],
[SoundCloud][soundcloud], [Spotify][spotify], [Streamable][streamable],
[Twitch][twitch], [Twitter][twitter] or [YouTube][youtube]) into your
[Gatsby][gatsby] website can be hard, since you have to know how this needs to
be done for all of these different services.

## This solution

`gatsby-remark-embedder` tries to solve this problem for you by letting you just
copy-paste the link to the gif/pen/pin/player/post/sandbox/tweet/video you want
to embed right from within your browser onto a separate line (surrounded by
empty lines) and replace it with the proper embed-code.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Supported services](#supported-services)
  - [CodePen](#codepen)
  - [CodeSandbox](#codesandbox)
  - [GIPHY](#giphy)
  - [Instagram](#instagram)
  - [Lichess](#lichess)
  - [Pinterest](#pinterest)
  - [Slides](#slides)
  - [SoundCloud](#soundcloud)
  - [Spotify](#spotify)
  - [Streamable](#streamable)
  - [Twitch](#twitch)
  - [Twitter](#twitter)
  - [YouTube](#youtube)
- [Options](#options)
  - [customTransformers](#customtransformers)
    - [Properties](#properties)
      - [`getHTML(url, options)`](#gethtmlurl-options)
      - [`name`](#name)
      - [`shouldTransform(url)`](#shouldtransformurl)
    - [Example transformer](#example-transformer)
  - [services](#services)
- [Inspiration](#inspiration)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors ✨](#contributors-)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```sh
npm install gatsby-remark-embedder
```

or

```sh
yarn add gatsby-remark-embedder
```

This library has a required `peerDependencies` listing for [`gatsby`][gatsby]
and should be used as a plugin for
[`gatsby-transformer-remark`][gatsby-transformer-remark] or
[`gatsby-plugin-mdx`][gatsby-plugin-mdx].  
Depending on the [services](#supported-services) you want to embed, you should
also install [`gatsby-plugin-instagram-embed`][gatsby-plugin-instagram-embed],
[`gatsby-plugin-pinterest`][gatsby-plugin-pinterest] and/or
[`gatsby-plugin-twitter`][gatsby-plugin-twitter].

## Usage

```js
// In your gatsby-config.js

module.exports = {
  // Find the 'plugins' array
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [
                // Your custom transformers
              ],
              services: {
                // The service-specific options by the name of the service
              },
            },
          },

          // Other plugins here...
        ],
      },
    },
  ],
};
```

or

```js
// In your gatsby-config.js

module.exports = {
  // Find the 'plugins' array
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [
                // Your custom transformers
              ],
              services: {
                // The service-specific options by the name of the service
              },
            },
          },

          // Other plugins here...
        ],
      },
    },
  ],
};
```

## Supported services

### CodePen

#### Usage

```md
https://codepen.io/team/codepen/pen/PNaGbb
```

<details>
  <summary><b>Result</b></summary>

```html
<iframe
  src="https://codepen.io/team/codepen/embed/preview/PNaGbb"
  style="width:100%; height:300px;"
></iframe>
```

</details>

### CodeSandbox

#### Usage

```md
https://codesandbox.io/s/ynn88nx9x?view=split
```

<details>
<summary><b>Result</b></summary>

```html
<iframe
  src="https://codesandbox.io/embed/ynn88nx9x?view=split"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
```

</details>

### GIPHY

#### Usage

```md
https://giphy.com/gifs/howtogiphygifs-how-to-XatG8bioEwwVO
```

<details>
<summary><b>Result</b></summary>

```html
<div style="width:100%;height:0;padding-bottom:63%;position:relative;">
  <iframe
    src="https://giphy.com/embed/XatG8bioEwwVO"
    width="100%"
    height="100%"
    style="position:absolute"
    frameborder="0"
    class="giphy-embed"
    allowfullscreen
  ></iframe>
</div>
```

</details>

### Instagram

The returned HTML snippet from the Instagram transformer will only be
automatically recognized as an embedded post when Instagram's embed JavaScript
is included on the page.  
Since the Instagram transformer doesn't include this JavaScript (because we
don't want to include it multiple times on a page when having multiple embeds),
you have to include it yourself. The recommended way of including it is by using
[`gatsby-plugin-instagram-embed`][gatsby-plugin-instagram-embed].

#### Usage

```md
https://instagram.com/p/B60jPE6J8U-
```

<details>
<summary><b>Result</b></summary>

```html
<blockquote
  class="instagram-media"
  data-instgrm-captioned
  data-instgrm-permalink="https://www.instagram.com/p/B60jPE6J8U-/?utm_source=ig_embed&amp;utm_campaign=loading"
  data-instgrm-version="12"
  style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"
>
  <div style="padding:16px;">
    <a
      href="https://www.instagram.com/p/B60jPE6J8U-/?utm_source=ig_embed&amp;utm_campaign=loading"
      style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;"
      target="_blank"
    >
      <div style="display: flex; flex-direction: row; align-items: center;">
        <div
          style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 40px; margin-right: 14px; width: 40px;"
        ></div>
        <div
          style="display: flex; flex-direction: column; flex-grow: 1; justify-content: center;"
        >
          <div
            style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; margin-bottom: 6px; width: 100px;"
          ></div>
          <div
            style="background-color: #F4F4F4; border-radius: 4px; flex-grow: 0; height: 14px; width: 60px;"
          ></div>
        </div>
      </div>
      <div style="padding: 19% 0;"></div>
      <div style="display:block; height:50px; margin:0 auto 12px; width:50px;">
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 60 60"
          version="1.1"
          xmlns="https://www.w3.org/2000/svg"
          xmlns:xlink="https://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-511.000000, -20.000000)" fill="#000000">
              <g>
                <path
                  d="M556.869,30.41 C554.814,30.41 553.148,32.076 553.148,34.131 C553.148,36.186 554.814,37.852 556.869,37.852 C558.924,37.852 560.59,36.186 560.59,34.131 C560.59,32.076 558.924,30.41 556.869,30.41 M541,60.657 C535.114,60.657 530.342,55.887 530.342,50 C530.342,44.114 535.114,39.342 541,39.342 C546.887,39.342 551.658,44.114 551.658,50 C551.658,55.887 546.887,60.657 541,60.657 M541,33.886 C532.1,33.886 524.886,41.1 524.886,50 C524.886,58.899 532.1,66.113 541,66.113 C549.9,66.113 557.115,58.899 557.115,50 C557.115,41.1 549.9,33.886 541,33.886 M565.378,62.101 C565.244,65.022 564.756,66.606 564.346,67.663 C563.803,69.06 563.154,70.057 562.106,71.106 C561.058,72.155 560.06,72.803 558.662,73.347 C557.607,73.757 556.021,74.244 553.102,74.378 C549.944,74.521 548.997,74.552 541,74.552 C533.003,74.552 532.056,74.521 528.898,74.378 C525.979,74.244 524.393,73.757 523.338,73.347 C521.94,72.803 520.942,72.155 519.894,71.106 C518.846,70.057 518.197,69.06 517.654,67.663 C517.244,66.606 516.755,65.022 516.623,62.101 C516.479,58.943 516.448,57.996 516.448,50 C516.448,42.003 516.479,41.056 516.623,37.899 C516.755,34.978 517.244,33.391 517.654,32.338 C518.197,30.938 518.846,29.942 519.894,28.894 C520.942,27.846 521.94,27.196 523.338,26.654 C524.393,26.244 525.979,25.756 528.898,25.623 C532.057,25.479 533.004,25.448 541,25.448 C548.997,25.448 549.943,25.479 553.102,25.623 C556.021,25.756 557.607,26.244 558.662,26.654 C560.06,27.196 561.058,27.846 562.106,28.894 C563.154,29.942 563.803,30.938 564.346,32.338 C564.756,33.391 565.244,34.978 565.378,37.899 C565.522,41.056 565.552,42.003 565.552,50 C565.552,57.996 565.522,58.943 565.378,62.101 M570.82,37.631 C570.674,34.438 570.167,32.258 569.425,30.349 C568.659,28.377 567.633,26.702 565.965,25.035 C564.297,23.368 562.623,22.342 560.652,21.575 C558.743,20.834 556.562,20.326 553.369,20.18 C550.169,20.033 549.148,20 541,20 C532.853,20 531.831,20.033 528.631,20.18 C525.438,20.326 523.257,20.834 521.349,21.575 C519.376,22.342 517.703,23.368 516.035,25.035 C514.368,26.702 513.342,28.377 512.574,30.349 C511.834,32.258 511.326,34.438 511.181,37.631 C511.035,40.831 511,41.851 511,50 C511,58.147 511.035,59.17 511.181,62.369 C511.326,65.562 511.834,67.743 512.574,69.651 C513.342,71.625 514.368,73.296 516.035,74.965 C517.703,76.634 519.376,77.658 521.349,78.425 C523.257,79.167 525.438,79.673 528.631,79.82 C531.831,79.965 532.853,80.001 541,80.001 C549.148,80.001 550.169,79.965 553.369,79.82 C556.562,79.673 558.743,79.167 560.652,78.425 C562.623,77.658 564.297,76.634 565.965,74.965 C567.633,73.296 568.659,71.625 569.425,69.651 C570.167,67.743 570.674,65.562 570.82,62.369 C570.966,59.17 571,58.147 571,50 C571,41.851 570.966,40.831 570.82,37.631"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
      <div style="padding-top: 8px;">
        <div
          style="color:#3897f0; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:550; line-height:18px;"
        >
          View this post on Instagram
        </div>
      </div>
      <div style="padding: 12.5% 0;"></div>
      <div
        style="display: flex; flex-direction: row; margin-bottom: 14px; align-items: center;"
      >
        <div>
          <div
            style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(0px) translateY(7px);"
          ></div>
          <div
            style="background-color: #F4F4F4; height: 12.5px; transform: rotate(-45deg) translateX(3px) translateY(1px); width: 12.5px; flex-grow: 0; margin-right: 14px; margin-left: 2px;"
          ></div>
          <div
            style="background-color: #F4F4F4; border-radius: 50%; height: 12.5px; width: 12.5px; transform: translateX(9px) translateY(-18px);"
          ></div>
        </div>
        <div style="margin-left: 8px;">
          <div
            style="background-color: #F4F4F4; border-radius: 50%; flex-grow: 0; height: 20px; width: 20px;"
          ></div>
          <div
            style="width: 0; height: 0; border-top: 2px solid transparent; border-left: 6px solid #f4f4f4; border-bottom: 2px solid transparent; transform: translateX(16px) translateY(-4px) rotate(30deg)"
          ></div>
        </div>
        <div style="margin-left: auto;">
          <div
            style="width: 0; border-top: 8px solid #F4F4F4; border-right: 8px solid transparent; transform: translateY(16px);"
          ></div>
          <div
            style="background-color: #F4F4F4; flex-grow: 0; height: 12px; width: 16px; transform: translateY(-4px);"
          ></div>
          <div
            style="width: 0; height: 0; border-top: 8px solid #F4F4F4; border-left: 8px solid transparent; transform: translateY(-4px) translateX(8px);"
          ></div>
        </div></div
    ></a>
    <p style="margin:8px 0 0 0; padding:0 4px;">
      <a
        href="https://www.instagram.com/p/B60jPE6J8U-/?utm_source=ig_embed&amp;utm_campaign=loading"
        style="color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;"
        target="_blank"
        >Good morning New York! 🗽 #newyork #nyc #brotrip #newyear #2020 #city
        #bluesky #clearsky #timessquare #nycitylife #nycityworld #urban
        #manhattan #travel #cold #winter #citytrip #lastday #streetview
        #citythatneversleeps #bucketlist #buildings #skyscraper #midtown</a
      >
    </p>
    <p
      style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;"
    >
      A post shared by
      <a
        href="https://www.instagram.com/michaeldeboey/?utm_source=ig_embed&amp;utm_campaign=loading"
        style="color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;"
        target="_blank"
      >
        Michaël De Boey</a
      >
      (@michaeldeboey) on
      <time
        style="font-family:Arial,sans-serif; font-size:14px; line-height:17px;"
        datetime="2020-01-02T14:45:30+00:00"
        >Jan 2, 2020 at 6:45am PST</time
      >
    </p>
  </div>
</blockquote>
```

</details>

### Lichess

#### Usage

```md
https://lichess.org/MPJcy1JW
```

<details>
<summary><b>Result</b></summary>

```html
<iframe
  src="https://lichess.org/embed/MPJcy1JW"
  width="600"
  height="397"
  frameborder="0"
></iframe>
```

</details>

### Pinterest

The returned HTML snippet from the Pinterest transformer will only be
automatically recognized as an embedded pin when Pinterest's embed JavaScript is
included on the page.  
Since the Pinterest transformer doesn't include this JavaScript (because we
don't want to include it multiple times on a page when having multiple embeds),
you have to include it yourself. The recommended way of including it is by using
[`gatsby-plugin-pinterest`][gatsby-plugin-pinterest].

#### Usage

```md
https://pinterest.com/pin/99360735500167749
```

<details>
<summary><b>Result</b></summary>

```html
<a
  data-pin-do="embedPin"
  href="https://pinterest.com/pin/99360735500167749"
></a>
```

</details>

### Slides

#### Usage

```md
https://slides.com/kentcdodds/oss-we-want
```

<details>
<summary><b>Result</b></summary>

```html
<iframe
  src="https://slides.com/kentcdodds/oss-we-want/embed"
  width="576"
  height="420"
  scrolling="no"
  frameborder="0"
  webkitallowfullscreen
  mozallowfullscreen
  allowfullscreen
></iframe>
```

</details>

### SoundCloud

#### Usage

```md
https://soundcloud.com/clemenswenners/africa
```

<details>
<summary><b>Result</b></summary>

```html
<iframe
  width="100%"
  height="300"
  scrolling="no"
  frameborder="no"
  src=https://w.soundcloud.com/player?url=https://soundcloud.com/clemenswenners/africa&color=ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true
></iframe>
```

</details>

### Spotify

#### Usage

```md
https://open.spotify.com/track/0It2bnTdLl2vyymzOkBI3L
```

<details>
<summary><b>Result</b></summary>

```html
<iframe
  src="https://open.spotify.com/embed/track/0It2bnTdLl2vyymzOkBI3L"
  width="100%"
  height="380"
  frameborder="0"
  allowtransparency="true"
  allow="encrypted-media"
></iframe>
```

</details>

### Streamable

#### Usage

```md
https://streamable.com/moo
```

<details>
<summary><b>Result</b></summary>

```html
<iframe
  class="streamable-embed"
  src="https://streamable.com/o/moo"
  frameborder="0"
  scrolling="no"
  width="1920"
  height="1080"
  allowfullscreen
></iframe>
```

</details>

### Twitch

Twitch embeds can only be embedded on HTTPS websites. Check out [the Gatsby
docs][gatsby-https-docs] for setting this up when developing locally.

#### Usage

```md
https://twitch.tv/videos/546761743
```

<details>
<summary><b>Result</b></summary>

```html
<iframe
  src="https://player.twitch.tv/?video=546761743"
  height="300"
  width="100%"
  frameborder="0"
  scrolling="no"
  allowfullscreen
></iframe>
```

</details>

#### Options

All options should go under the `Twitch` namespace.

| name   | Type                  | Required | Default | Description                                                                                           |
| ------ | --------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------- |
| parent | `string` / `string[]` | ✅       |         | Domain(s) that will be embedding Twitch. You must have one parent key for each domain your site uses. |

##### parent

You could either put in (a) hardcoded value(s) _or_ you could use environment
variables that are available during the build process.

###### Netlify

Netlify has the `URL`, `DEPLOY_URL` and `DEPLOY_PRIME_URL` environment
variables. Take a look at [the Netlify docs][netlify-environment-variables-docs]
for more info.

<details>
<summary><b>Example</b></summary>

```js
const GatsbyRemarkEmbedderOptions = {
  services: {
    Twitch: {
      parent: [
        env.process.URL,
        env.process.DEPLOY_URL,
        env.process.DEPLOY_PRIME_URL,

        // Other domains here...
      ],
    },
  },
};
```

</details>

###### Vercel

Vercel has the `VERCEL_URL` environment variable. Take a look at [the Vercel
docs][vercel-environment-variables-docs] for more info.

<details>
<summary><b>Example</b></summary>

```js
const GatsbyRemarkEmbedderOptions = {
  services: {
    Twitch: {
      parent: [
        env.process.VERCEL_URL,

        // Other domains here...
      ],
    },
  },
};
```

</details>

### Twitter

The returned HTML snippet from the Twitter transformer will only be
automatically recognized as an [Embedded Tweet][embedded-tweet-docs] when
[Twitter's widget JavaScript][twitter-widget-javascript-docs] is included on the
page.  
Since the Twitter transformer doesn't include this JavaScript (because we don't
want to include it multiple times on a page when having multiple embeds), you
have to include it yourself. The recommended way of including it is by using
[`gatsby-plugin-twitter`][gatsby-plugin-twitter].

#### Usage

```md
https://twitter.com/MichaelDeBoey93/status/1152991421789548546

https://twitter.com/i/moments/994601867987619840

https://twitter.com/wesbos/timelines/1189618481672667136
```

<details>
<summary><b>Result</b></summary>

```html
<blockquote class="twitter-tweet" data-dnt="true">
  <p lang="en" dir="ltr" class="css-yw8fqx e11rucy10">
    Happy to announce I just published the first gatsby-remark-embedder 🎉🎉🎉
    <br />
    <br />
    This first version is an extract of
    <a href="https://twitter.com/kentcdodds">@kentcdodds</a>' personal website
    remark-embedder plugin, but I'm planning on adding extra services then
    <a href="https://twitter.com/codesandbox">@codesandbox</a>,<a
      href="https://twitter.com/Twitter"
    >
      @Twitter
    </a>
    &amp; <a href="https://twitter.com/YouTube">@YouTube</a> too.
    <a href="https://t.co/M4PA9aFZdG">https://t.co/M4PA9aFZdG</a>
  </p>
  — Michaël De Boey (@MichaelDeBoey93)
  <a href="https://twitter.com/MichaelDeBoey93/status/1152991421789548546">
    July 21, 2019
  </a>
</blockquote>

<a
  class="twitter-moment"
  href="https://twitter.com/i/moments/994601867987619840"
>
  🔥 Design Tips
</a>

<a
  class="twitter-timeline"
  href="https://twitter.com/wesbos/timelines/1189618481672667136"
>
  🔥 Hot Tips from Wes Bos - Curated tweets by wesbos
</a>
```

</details>

### YouTube

The YouTube transformer (currently) only supports videos in the following
formats:

- Full url (`https://youtube.com/watch?v=dQw4w9WgXcQ`)
- Short url (`https://youtu.be/dQw4w9WgXcQ`)

#### Usage

```md
https://youtu.be/dQw4w9WgXcQ
```

<details>
<summary><b>Result</b></summary>

```html
<iframe
  width="100%"
  height="315"
  src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0"
  frameborder="0"
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
></iframe>
```

</details>

## Options

### customTransformers

The plugin allows you to pass an array of custom transformers that will be
executed additionally to the default ones.

#### Properties

Each transformer should be an object which has the following properties:

##### `getHTML(url, options)`

The `getHTML` method is executed when the given URL has been matched to
transform. It should return the transformed HTML.  
This asynchronous function receives the URL to transform together with an
options object to take into account when transforming.

##### `name`

The `name` is the value that needs to be used as a key in the
[`services` plugin option](#services). The value for this key will be provided
as the second argument to [`getHTML`](#gethtmlurl-options).

##### `shouldTransform(url)`

The `shouldTransform` method should check if the given URL matches the one
intended to transform. It should return a boolean value.

#### Example transformer

```js
// some-site-transformer.js
const getHTML = (url) => `<iframe src="${url}"></iframe>`;

const name = 'someSite';

const regex = /^https?:\/\/some-site\.com\//;
const shouldTransform = (url) => regex.test(url);

module.exports = { getHTML, name, shouldTransform };
```

### services

The plugin also allows you to pass an object which keys that represent the name
of the [service](#supported-services) to transform and the value that's an
object with options for that specific service.

## Inspiration

This whole plugin was extracted out of Kent C. Dodds' [personal
website][kentcdodds.com-repo].

The intention is to make this available to be used independently.

## Issues

_Looking to contribute? Look for the [Good First Issue][good-first-issue]
label._

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

## Contributors ✨

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars0.githubusercontent.com/u/1500684?v=4" width="100px;" alt=""/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#ideas-kentcdodds" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://michaeldeboey.be"><img src="https://avatars3.githubusercontent.com/u/6643991?v=4" width="100px;" alt=""/><br /><sub><b>Michaël De Boey</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3AMichaelDeBoey" title="Bug reports">🐛</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=MichaelDeBoey" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=MichaelDeBoey" title="Documentation">📖</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=MichaelDeBoey" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/lekterable"><img src="https://avatars2.githubusercontent.com/u/23037261?v=4" width="100px;" alt=""/><br /><sub><b>Kornel Dubieniecki</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3Alekterable" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://nicknish.co"><img src="https://avatars2.githubusercontent.com/u/5567838?v=4" width="100px;" alt=""/><br /><sub><b>Nick Nish</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=nicknish" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=nicknish" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/caneco"><img src="https://avatars0.githubusercontent.com/u/502041?v=4" width="100px;" alt=""/><br /><sub><b>Caneco</b></sub></a><br /><a href="#design-caneco" title="Design">🎨</a></td>
    <td align="center"><a href="http://anuraghazra.github.io"><img src="https://avatars3.githubusercontent.com/u/35374649?v=4" width="100px;" alt=""/><br /><sub><b>Anurag Hazra</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3Aanuraghazra" title="Bug reports">🐛</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=anuraghazra" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=anuraghazra" title="Tests">⚠️</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=anuraghazra" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/jyash97"><img src="https://avatars0.githubusercontent.com/u/22376783?v=4" width="100px;" alt=""/><br /><sub><b>Yash Joshi</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=jyash97" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=jyash97" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://cms.gt"><img src="https://avatars2.githubusercontent.com/u/130128?v=4" width="100px;" alt=""/><br /><sub><b>Christian C. Salvadó</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=cms" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=cms" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://www.jamessimone.net"><img src="https://avatars2.githubusercontent.com/u/16430727?v=4" width="100px;" alt=""/><br /><sub><b>James Simone</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=jamessimone" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=jamessimone" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://hanabi.in"><img src="https://avatars3.githubusercontent.com/u/5466083?v=4" width="100px;" alt=""/><br /><sub><b>Agastya Chandrakant</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=acagastya" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=acagastya" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://fabiorosado.co.uk"><img src="https://avatars0.githubusercontent.com/u/3131401?v=4" width="100px;" alt=""/><br /><sub><b>Fábio Rosado</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=FabioRosado" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=FabioRosado" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://www.kopi.dev"><img src="https://avatars1.githubusercontent.com/u/4743772?v=4" width="100px;" alt=""/><br /><sub><b>Arryangga Aliev Pratamaputra</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3Aarryanggaputra" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.osiux.ws"><img src="https://avatars2.githubusercontent.com/u/204463?v=4" width="100px;" alt=""/><br /><sub><b>Eduardo Reveles</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=osiux" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=osiux" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/pieh"><img src="https://avatars1.githubusercontent.com/u/419821?v=4" width="100px;" alt=""/><br /><sub><b>Michal Piechowiak</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3Apieh" title="Bug reports">🐛</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=pieh" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=pieh" title="Tests">⚠️</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://bradgarropy.com"><img src="https://avatars2.githubusercontent.com/u/11336745?v=4" width="100px;" alt=""/><br /><sub><b>Brad Garropy</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3Abradgarropy" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://lyamkin.com"><img src="https://avatars2.githubusercontent.com/u/3854930?v=4" width="100px;" alt=""/><br /><sub><b>Ilya Lyamkin</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=ilyamkin" title="Code">💻</a></td>
    <td align="center"><a href="http://simonmacdonald.com"><img src="https://avatars1.githubusercontent.com/u/353180?v=4" width="100px;" alt=""/><br /><sub><b>Simon MacDonald</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3Amacdonst" title="Bug reports">🐛</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=macdonst" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=macdonst" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://nickymeuleman.netlify.app/"><img src="https://avatars2.githubusercontent.com/u/30179461?v=4" width="100px;" alt=""/><br /><sub><b>Nicky Meuleman</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=NickyMeuleman" title="Code">💻</a></td>
    <td align="center"><a href="http://heyayush.dev"><img src="https://avatars3.githubusercontent.com/u/17379963?v=4" width="100px;" alt=""/><br /><sub><b>Ayush</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=heyAyushh" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

<!-- prettier-ignore-start -->
[npm]: https://npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/com/MichaelDeBoey/gatsby-remark-embedder.svg?style=flat-square
[build]: https://travis-ci.com/MichaelDeBoey/gatsby-remark-embedder
[coverage-badge]: https://img.shields.io/codecov/c/github/MichaelDeBoey/gatsby-remark-embedder.svg?style=flat-square
[coverage]: https://codecov.io/github/MichaelDeBoey/gatsby-remark-embedder
[version-badge]: https://img.shields.io/npm/v/gatsby-remark-embedder.svg?style=flat-square
[package]: https://www.npmjs.com/package/gatsby-remark-embedder
[downloads-badge]: https://img.shields.io/npm/dm/gatsby-remark-embedder.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/gatsby-remark-embedder
[license-badge]: https://img.shields.io/npm/l/gatsby-remark-embedder.svg?style=flat-square
[license]: https://github.com/MichaelDeBoey/gatsby-remark-embedder/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[coc-badge]: https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square
[coc]: https://github.com/MichaelDeBoey/gatsby-remark-embedder/blob/master/other/CODE_OF_CONDUCT.md
[emojis]: https://allcontributors.org/docs/en/emoji-key
[all-contributors]: https://github.com/all-contributors/all-contributors
[bugs]: https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+label%3A%22%F0%9F%90%9B+Bug%22+sort%3Acreated-desc
[requests]: https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3A%22good+first+issue%22

[codepen]: https://codepen.io
[codesandbox]: https://codesandbox.io
[embedded-tweet-docs]: https://developer.twitter.com/web/embedded-tweets
[gatsby]: https://github.com/gatsbyjs/gatsby
[gatsby-https-docs]: https://gatsbyjs.org/docs/local-https
[gatsby-plugin-instagram-embed]: https://github.com/MichaelDeBoey/gatsby-plugin-instagram-embed
[gatsby-plugin-mdx]: https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-mdx
[gatsby-plugin-pinterest]: https://github.com/robinmetral/gatsby-plugin-pinterest
[gatsby-plugin-twitter]: https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-twitter
[gatsby-transformer-remark]: https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-remark
[giphy]: https://giphy.com
[instagram]: https://instagram.com
[kentcdodds.com-repo]: https://github.com/kentcdodds/kentcdodds.com
[lichess]: https://lichess.org
[netlify-environment-variable-docs]: https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
[pinterest]: https://pinterest.com
[slides]: https://slides.com
[soundcloud]: https://soundcloud.com
[spotify]: https://spotify.com
[streamable]: https://streamable.com
[twitch]: https://twitch.tv
[twitter]: https://twitter.com
[twitter-widget-javascript-docs]: https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/overview
[vercel-environment-variable-docs]: https://vercel.com/docs/v2/build-step?query=Build#system-environment-variables
[youtube]: https://youtube.com
<!-- prettier-ignore-end -->
