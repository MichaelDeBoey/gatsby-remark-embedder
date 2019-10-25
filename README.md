<div align="center">
<img width="450" height="76" src="https://raw.githubusercontent.com/MichaelDeBoey/gatsby-remark-embedder/master/art/logo.png" alt="gatsby-remark-embedder logo" />

<h1>gatsby-remark-embedder</h1>

<p>Gatsby Remark plugin to embed well known services by their URL.</p>
</div>

---

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs] [![Code of Conduct][coc-badge]][coc]

## The problem

Trying to embed well known services (like [CodePen][codepen],
[CodeSandbox][codesandbox], [Slides][slides], [SoundCloud][soundcloud],
[Twitter][twitter] or [YouTube][youtube]) into your [Gatsby][gatsby] website can
be hard, since you have to know how this needs to be done for all of these
different services.

## This solution

`gatsby-remark-embedder` tries to solve this problem for you by letting you just
copy-paste the link to the pen/player/sandbox/tweet/video you want to embed
right from within your browser onto a separate line (surrounded by empty lines)
and replace it with the proper embed-code.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [Supported services](#supported-services)
  - [CodePen](#codepen)
  - [CodeSandbox](#codesandbox)
  - [Slides](#slides)
  - [SoundCloud](#soundcloud)
  - [Twitter](#twitter)
  - [YouTube](#youtube)
- [Inspiration](#inspiration)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
- [Contributors](#contributors)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:

```sh
npm install --save gatsby-remark-embedder
```

This library has `peerDependencies` listings for [`gatsby`][gatsby].

## Usage

```js
// In your gatsby-config.js

plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [`gatsby-remark-embedder`],
    },
  },
];
```

## Supported services

### CodePen

#### Usage

```md
https://codepen.io/team/codepen/pen/PNaGbb
```

#### Result

```html
<iframe
  src="https://codepen.io/team/codepen/embed/preview/PNaGbb"
  style="width:100%; height:300px;"
></iframe>
```

### CodeSandbox

#### Usage

```md
https://codesandbox.io/s/ynn88nx9x?view=split
```

#### Result

```html
<iframe
  src="https://codesandbox.io/embed/ynn88nx9x?view=split"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb"
  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
></iframe>
```

### Slides

#### Usage

```md
https://slides.com/kentcdodds/oss-we-want
```

#### Result

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

### SoundCloud

#### Usage

```md
https://soundcloud.com/clemenswenners/africa
```

#### Result

```html
<iframe
  width="100%"
  height="300"
  scrolling="no"
  frameborder="no"
  src=https://w.soundcloud.com/player?url=https://soundcloud.com/clemenswenners/africa&color=ff5500&auto_play=false&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false&visual=true
></iframe>
```

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
```

#### Result

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
```

### YouTube

The YouTube transformer (currently) only supports videos in the following
formats:

- Full url (`https://youtube.com/watch?v=dQw4w9WgXcQ`)
- Short url (`https://youtu.be/dQw4w9WgXcQ`)

#### Usage

```md
https://youtu.be/dQw4w9WgXcQ
```

#### Result

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

## Inspiration

This whole library was extracted out of Kent C. Dodds' [personal
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

## Contributors

Thanks goes to these people ([emoji key][emojis]):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars0.githubusercontent.com/u/1500684?v=4" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#ideas-kentcdodds" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://michaeldeboey.be"><img src="https://avatars3.githubusercontent.com/u/6643991?v=4" width="100px;" alt="Michaël De Boey"/><br /><sub><b>Michaël De Boey</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3AMichaelDeBoey" title="Bug reports">🐛</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=MichaelDeBoey" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=MichaelDeBoey" title="Documentation">📖</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=MichaelDeBoey" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/lekterable"><img src="https://avatars2.githubusercontent.com/u/23037261?v=4" width="100px;" alt="Kornel Dubieniecki"/><br /><sub><b>Kornel Dubieniecki</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3Alekterable" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://nicknish.co"><img src="https://avatars2.githubusercontent.com/u/5567838?v=4" width="100px;" alt="Nick Nish"/><br /><sub><b>Nick Nish</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=nicknish" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=nicknish" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/caneco"><img src="https://avatars0.githubusercontent.com/u/502041?v=4" width="100px;" alt="Caneco"/><br /><sub><b>Caneco</b></sub></a><br /><a href="#design-caneco" title="Design">🎨</a></td>
    <td align="center"><a href="http://anuraghazra.github.io"><img src="https://avatars3.githubusercontent.com/u/35374649?v=4" width="100px;" alt="Anurag Hazra"/><br /><sub><b>Anurag Hazra</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3Aanuraghazra" title="Bug reports">🐛</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=anuraghazra" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=anuraghazra" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors][all-contributors] specification.
Contributions of any kind welcome!

## LICENSE

MIT

<!-- prettier-ignore-start -->
[npm]: https://npmjs.com
[node]: https://nodejs.org
[build-badge]: https://img.shields.io/travis/MichaelDeBoey/gatsby-remark-embedder.svg?style=flat-square
[build]: https://travis-ci.org/MichaelDeBoey/gatsby-remark-embedder
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
[good-first-issue]: https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement+label%3A%22good+first+issue%22

[codepen]: https://codepen.io
[codesandbox]: https://codesandbox.io
[embedded-tweet-docs]: https://developer.twitter.com/web/embedded-tweets
[gatsby]: https://github.com/gatsbyjs/gatsby
[gatsby-plugin-twitter]: https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-twitter
[kentcdodds.com-repo]: https://github.com/kentcdodds/kentcdodds.com
[slides]: https://slides.com
[soundcloud]: https://soundcloud.com
[twitter]: https://twitter.com
[twitter-widget-javascript-docs]: https://developer.twitter.com/en/docs/twitter-for-websites/javascript-api/overview
[youtube]: https://youtube.com
<!-- prettier-ignore-end -->
