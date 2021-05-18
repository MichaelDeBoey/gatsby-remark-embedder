"use strict";

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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const defaultTransformers = [CodePenTransformer, CodeSandboxTransformer, GIPHYTransformer, InstagramTransformer, LichessTransformer, PinterestTransformer, SlidesTransformer, SoundCloudTransformer, SpotifyTransformer, StreamableTransformer, TestingPlaygroundTransformer, TwitchTransformer, TwitterTransformer, YouTubeTransformer];
exports.defaultTransformers = defaultTransformers;