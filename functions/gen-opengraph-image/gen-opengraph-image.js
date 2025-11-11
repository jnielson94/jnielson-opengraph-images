const { chromium: playwright } = require("playwright-core");
const chromium = require("@sparticuz/chromium");
const path = require("path");
const fs = require("fs");
const script = fs.readFileSync(path.resolve(__dirname, "image.js"), "utf-8");

exports.handler = async function (event, ctx) {
  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  page.setViewportSize({
    width: 1200,
    height: 630,
  });
  await page.setContent(`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
    </head>

    <body>
      <div id="corgi"><div>NO CORGIS HERE</div></div>
    </body>
  </html>
  `);
  const { queryStringParameters } = event;
  const tags = queryStringParameters.tags
    ? decodeURIComponent(queryStringParameters.tags).split(",")
    : [];
  console.log(queryStringParameters);
  await page.addScriptTag({
    content: `
  window.title = "${
    queryStringParameters.title
      ? decodeURIComponent(queryStringParameters.title)
      : "Jordan Nielson's Site"
  }";
  window.tags = ${JSON.stringify(tags) || ""};
  window.author = "${
    queryStringParameters.author
      ? decodeURIComponent(queryStringParameters.author)
      : "@jnielson94"
  }";
  `,
  });
  await page.addScriptTag({ content: script });
  const boundingRect = await page.evaluate(() => {
    const corgi = document.getElementById("corgi");
    const { x, y, width, height } = corgi.children[0].getBoundingClientRect();
    return { x, y, width, height };
  });
  console.log("Screenshotting and responding", boundingRect);

  const screenshotBuffer = await page.screenshot({ clip: boundingRect });
  await browser.close();
  const contentLength = screenshotBuffer.toString("base64").length.toString();
  console.log({ contentLength });
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": screenshotBuffer.toString("base64").length.toString(),
    },
    body: screenshotBuffer.toString("base64"),
  };
};
