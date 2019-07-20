<div align="center">
<h1>gatsby-remark-embedder</h1>

<p>Gatsby Remark plugin to embed well known services by their URL.</p>
</div>

---

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package] [![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome][prs-badge]][prs] [![Code of Conduct][coc-badge]][coc]

## The problem

Trying to embed well known services (like CodeSandbox, Twitter or YouTube) into
your Gatsby website can be hard, since you have to know how this needs to be
done for all of these different services.

## This solution

`gatsby-remark-embedder` tries to solve this problem for you by letting you just
copy-paste the link to the sandbox/tweet/video you want to embed on a separate
line and replace it with the proper embed-code.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
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
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://kentcdodds.com"><img src="https://avatars0.githubusercontent.com/u/1500684?v=4" width="100px;" alt="Kent C. Dodds"/><br /><sub><b>Kent C. Dodds</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=kentcdodds" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#ideas-kentcdodds" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-kentcdodds" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=kentcdodds" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://michaeldeboey.be"><img src="https://avatars3.githubusercontent.com/u/6643991?v=4" width="100px;" alt="Michaël De Boey"/><br /><sub><b>Michaël De Boey</b></sub></a><br /><a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=author%3AMichaelDeBoey" title="Bug reports">🐛</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=MichaelDeBoey" title="Code">💻</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=MichaelDeBoey" title="Documentation">📖</a> <a href="https://github.com/MichaelDeBoey/gatsby-remark-embedder/commits?author=MichaelDeBoey" title="Tests">⚠️</a></td>
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
[bugs]: https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Acreated-desc
[requests]: https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?utf8=✓&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3Aenhancement
[good-first-issue]: https://github.com/MichaelDeBoey/gatsby-remark-embedder/issues?utf8=✓&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3A"good+first+issue"

[gatsby]: https://github.com/gatsbyjs/gatsby
[kentcdodds.com-repo]: https://github.com/kentcdodds/kentcdodds.com
<!-- prettier-ignore-end -->
