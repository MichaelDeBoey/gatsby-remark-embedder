import puppeteer from 'puppeteer';

const getImage = async (url) => {
  const browser = await puppeteer.launch({
    // disable sandbox in production
    args: process.env.NODE_ENV === 'production' ? ['--no-sandbox'] : [],
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.click('[aria-label=Export]');
  await page.click("[aria-label='Scale 3 x']");

  const frame = await page.mainFrame();
  const result = await frame.evaluate(
    () =>
      new Promise((resolve, reject) => {
        try {
          delete window.chooseFileSystemEntries;
          const reader = new FileReader();
          reader.addEventListener('loadend', () => resolve(reader.result));
          reader.addEventListener('error', () => reject(reader.error));
          URL.createObjectURL = (blob) => reader.readAsText(blob);

          const button = document.querySelector('[aria-label="Export to SVG"]');
          button.click();
        } catch (error) {
          reject(error);
        }
      })
  );

  await browser.close();
  return result;
};

export const shouldTransform = (url) =>
  /^https?:\/\/(www\.)?excalidraw\.com\/#json=/.test(url);

export const getHTML = async (url) => {
  const svg = await getImage(url);
  return `<a style="box-shadow: none" href="${url}">${svg
    .replace('<svg', '<svg role="img" aria-label="Excalidraw drawing"')
    .replace(/\n\s*/g, '')}</a>`;
};
