export const shouldTransform = (url) => {
  const { host, pathname } = new URL(url);

  return (
    ['stackblitz.com'].includes(host) &&
    pathname.includes('/edit/')
  );
};

export const getStackBlitzEmbedIframe = (url) => {
  const editRegex = /(.*\/edit\/.*?)((?:\?.*$)|$)/;
  const regexResults = editRegex.exec(url);
  const base = regexResults[1];
  let queryStr = regexResults[2];
  if (queryStr) {
    queryStr = queryStr.replace('?', '?embed=1&');
  } else {
    queryStr = '?embed=1';
  }

  return `${base}${queryStr}`;
}

export const getHTML = (url) => {
  const iframeUrl = getStackBlitzEmbedIframe(url);

  return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`;
};
