import * as CodePenTransformer from './CodePen';
import * as CodeSandboxTransformer from './CodeSandbox';
import * as SlidesTransformer from './Slides';
import * as SoundCloudTransformer from './SoundCloud';
import * as SpotifyTransformer from './Spotify';
import * as StreamableTransformer from './Streamable';
import * as TwitterTransformer from './Twitter';
import * as YouTubeTransformer from './YouTube';

export const defaultTransformers = [
  CodePenTransformer,
  CodeSandboxTransformer,
  SlidesTransformer,
  SoundCloudTransformer,
  SpotifyTransformer,
  StreamableTransformer,
  TwitterTransformer,
  YouTubeTransformer,
];
