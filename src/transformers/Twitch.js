import { getTrimmedPathName } from './utils';

const getUrlConfig = (url) => {
  const { host, pathname, searchParams } = new URL(url);
  const splittedTrimmedPathName = getTrimmedPathName(pathname).split('/');

  return { host, pathname, searchParams, splittedTrimmedPathName };
};

const getIdFromUrl = (urlConfig, param) =>
  urlConfig.searchParams.get(param) ||
  urlConfig.splittedTrimmedPathName.slice(-1)[0];

const isFromPlayerDomainWithParam = ({ host, searchParams }, param) =>
  host === 'player.twitch.tv' && Boolean(searchParams.get(param));

const isFromTwitchDomain = (host) =>
  ['twitch.tv', 'www.twitch.tv'].includes(host);

const isChannel = ({ host, searchParams, splittedTrimmedPathName }) =>
  isFromPlayerDomainWithParam({ host, searchParams }, 'channel') ||
  (isFromTwitchDomain(host) &&
    splittedTrimmedPathName.length === 1 &&
    Boolean(splittedTrimmedPathName[0]));

const isClip = ({ host, splittedTrimmedPathName }) =>
  (host === 'clips.twitch.tv' &&
    splittedTrimmedPathName.length === 1 &&
    splittedTrimmedPathName[0] !== 'embed') ||
  (isFromTwitchDomain(host) &&
    splittedTrimmedPathName.length === 3 &&
    splittedTrimmedPathName[1] === 'clip');

const isCollection = ({ host, searchParams, splittedTrimmedPathName }) =>
  isFromPlayerDomainWithParam({ host, searchParams }, 'collection') ||
  (isFromTwitchDomain(host) &&
    ((splittedTrimmedPathName.length === 2 &&
      splittedTrimmedPathName[0] === 'collections') ||
      (splittedTrimmedPathName.length === 3 &&
        splittedTrimmedPathName[1] === 'collection')));

const isVideo = ({ host, searchParams, splittedTrimmedPathName }) =>
  isFromPlayerDomainWithParam({ host, searchParams }, 'video') ||
  (isFromTwitchDomain(host) &&
    splittedTrimmedPathName.length === 2 &&
    splittedTrimmedPathName[0] === 'videos');

export const shouldTransform = (url) => {
  const urlConfig = getUrlConfig(url);

  return (
    isChannel(urlConfig) ||
    isClip(urlConfig) ||
    isCollection(urlConfig) ||
    isVideo(urlConfig)
  );
};

export const getTwitchIFrameSrc = (urlString) => {
  const urlConfig = getUrlConfig(urlString);

  if (isClip(urlConfig)) {
    return `https://clips.twitch.tv/embed?clip=${getIdFromUrl(
      urlConfig,
      'clip'
    )}`;
  }

  if (isVideo(urlConfig)) {
    return `https://player.twitch.tv?video=${getIdFromUrl(urlConfig, 'video')}`;
  }

  if (isCollection(urlConfig)) {
    return `https://player.twitch.tv?collection=${getIdFromUrl(
      urlConfig,
      'collection'
    )}`;
  }

  return `https://player.twitch.tv?channel=${getIdFromUrl(
    urlConfig,
    'channel'
  )}`;
};

export const getHTML = (url) => {
  const iframeUrl = getTwitchIFrameSrc(url);

  return `<iframe src="${iframeUrl}" height="300" width="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>`;
};
