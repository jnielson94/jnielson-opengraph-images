const cloudinary = require("cloudinary").v2;
const qs = require("querystring");
cloudinary.config({
    cloud_name: "jnielson",
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

exports.handler = async function (event, ctx) {
  const {queryStringParameters} = event
  console.log(queryStringParameters)
  console.log(process.env.IMAGE_VERSION);
  console.log(process.env.CLOUDINARY_KEY);
  console.log(process.env.CLOUDINARY_SECRET)
  try {
    // https://res.cloudinary.com/sector/image/upload/v1583637123/og-images/img-1.png
    const imageUrl = cloudinary.url(
      `${process.env.IMAGE_VERSION}/og-images/transparent.png`,
      {
        // resouce_type: "raw"
        sign_url: true,
        // secure: true,
        custom_pre_function: {
          function_type: 'remote',
          source: encodeURIComponent(
            `https://agitated-edison-8b447e.netlify.com/.netlify/functions/gen-opengraph-image?${qs.stringify(
              queryStringParameters,
            )}`,
          ),
        },
      },
    )
    console.log(
      `https://agitated-edison-8b447e.netlify.com/.netlify/functions/gen-opengraph-image?${qs.stringify(
        queryStringParameters,
      )}`,
    )
    return {
      statusCode: 302,
      headers: {
        Location: imageUrl,
      },
      body: '',
    }
  } catch (e) {
    console.log(e)
  }
}