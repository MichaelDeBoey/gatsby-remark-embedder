import { URL } from 'url';

export const shouldTransform = url => {
  const { host, pathname, searchParams } = new URL(url);

  return (
    host === 'youtu.be' ||
    (['youtube.com', 'www.youtube.com'].includes(host) &&
      pathname.includes('/watch') &&
      Boolean(searchParams.get('v')))
  );
};

export const getTimeValueInSeconds = timeValue => {
  if (Number(timeValue).toString() === timeValue) {
    return timeValue;
  }

  const {
    2: hours = '0',
    4: minutes = '0',
    6: seconds = '0',
  } = timeValue.match(/((\d*)h)?((\d*)m)?((\d*)s)?/);

  return String((Number(hours) * 60 + Number(minutes)) * 60 + Number(seconds));
};
export const getYouTubeIFrameSrc = urlString => {
  const url = new URL(urlString);
  let id = url.searchParams.get('v');
  if (url.host === 'youtu.be') {
    id = url.pathname.slice(1);
  }
  const embedUrl = new URL(
    `https://www.youtube-nocookie.com/embed/${id}?rel=0`
  );
  url.searchParams.forEach((value, name) => {
    if (name === 'v') {
      return;
    }

    if (name === 't') {
      embedUrl.searchParams.append('start', getTimeValueInSeconds(value));
    } else {
      embedUrl.searchParams.append(name, value);
    }
  });

  return embedUrl.toString();
};
export const getHTML = url => {
  const iframeSrc = getYouTubeIFrameSrc(url);

  return `<iframe width="100%" height="315" src="${iframeSrc}" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>`;
};
