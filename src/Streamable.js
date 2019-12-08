export const shouldTransform = url =>
  /^https?:\/\/streamable\.com\/s\//.test(url);

export const getHTML = url =>
  `<div
  height="0"
  style="position: relative;"
  width="100%"
>
  <iframe
    height="100%"
    src="${url}"
    style="overflow: hidden; position: absolute;"
    width="100%"
  >
  </iframe>
</div>`;
