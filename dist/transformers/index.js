"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultTransformers = void 0;

var CodePenTransformer = _interopRequireWildcard(require("./CodePen"));

var CodeSandboxTransformer = _interopRequireWildcard(require("./CodeSandbox"));

var GIPHYTransformer = _interopRequireWildcard(require("./GIPHY"));

var InstagramTransformer = _interopRequireWildcard(require("./Instagram"));

var LichessTransformer = _interopRequireWildcard(require("./Lichess"));

var PinterestTransformer = _interopRequireWildcard(require("./Pinterest"));

var SlidesTransformer = _interopRequireWildcard(require("./Slides"));

var SoundCloudTransformer = _interopRequireWildcard(require("./SoundCloud"));

var SpotifyTransformer = _interopRequireWildcard(require("./Spotify"));

var StreamableTransformer = _interopRequireWildcard(require("./Streamable"));

var TestingPlaygroundTransformer = _interopRequireWildcard(require("./TestingPlayground"));

var TwitchTransformer = _interopRequireWildcard(require("./Twitch"));

var TwitterTransformer = _interopRequireWildcard(require("./Twitter"));

var YouTubeTransformer = _interopRequireWildcard(require("./YouTube"));

const defaultTransformers = [CodePenTransformer, CodeSandboxTransformer, GIPHYTransformer, InstagramTransformer, LichessTransformer, PinterestTransformer, SlidesTransformer, SoundCloudTransformer, SpotifyTransformer, StreamableTransformer, TestingPlaygroundTransformer, TwitchTransformer, TwitterTransformer, YouTubeTransformer];
exports.defaultTransformers = defaultTransformers;