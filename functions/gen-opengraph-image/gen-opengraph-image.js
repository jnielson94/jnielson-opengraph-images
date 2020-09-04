const playwright = require("playwright-aws-lambda");
const fs = require("fs");
console.log(fs.readdirSync('./src'));
const script = fs.readFileSync("./src/image-out.js", "utf-8");

exports.handler = async function(event, ctx) {
  const browser = await playwright.launchChromium();
  const context = await browser._defaultContext;
  const page = await context.newPage();
  page.setViewportSize({
    width: 1200,
    height: 630
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
  window.title = "${queryStringParameters.title ? decodeURIComponent(queryStringParameters.title) : "Jordan Nielson's Site"}";
  window.tags = ${JSON.stringify(tags)};
  window.author = "${queryStringParameters.author ? decodeURIComponent(queryStringParameters.author) : "@jnielson94"}";
  `
  });
  await page.addScriptTag({ content: script });
  const boundingRect = await page.evaluate(() => {
    const corgi = document.getElementById("corgi");
    const { x, y, width, height } = corgi.children[0].getBoundingClientRect();
    return { x, y, width, height };
  });

  const screenshotBuffer = await page.screenshot({ clip: boundingRect });
  await browser.close();
  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": screenshotBuffer.length.toString()
    },
    body: screenshotBuffer.toString("base64")
  };
};