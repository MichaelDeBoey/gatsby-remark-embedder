export const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return (
    host === 'docs.google.com' ||
    (['www.docs.google.com', 'docs.google.com'].includes(host) &&
      pathname.split('/').length === 6)
  );
};

export const getGoogleSlidesFrameSrc = (urlString) => {
  const { pathname } = new URL(urlString);
  const splitedPathName = pathname.split('/');
  const id = splitedPathName[splitedPathName.length - 2];

  const embedUrl = new URL(
    `https://docs.google.com/presentation/d/e/${id}/embed?start=false&loop=false&delayms=3000`
  );

  return embedUrl.toString();
};

export const getHTML = (url) => {
  const iframeUrl = getGoogleSlidesFrameSrc(url);

  return `<iframe src="${iframeUrl}" frameborder="0" width="960" height="569" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>`;
};
