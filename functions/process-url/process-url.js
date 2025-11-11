const cloudinary = require("cloudinary").v2;
const qs = require("querystring");
cloudinary.config({
  cloud_name: "jnielson",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports.handler = async function (event, ctx) {
  const { queryStringParameters } = event;
  console.log(queryStringParameters);

  try {
    // https://res.cloudinary.com/sector/image/upload/v1583637123/og-images/img-1.png
    const transparentURL = `${process.env.IMAGE_VERSION}/og-images/transparent.png`;
    const baseURL =
      process.env.GEN_OPENGRAPH_IMAGE_BASE_URL ||
      "https://jordans-images.netlify.app/.netlify/functions/gen-opengraph-image";
    console.log("URLs: ", { transparentURL, baseURL });
    const imageUrl = cloudinary.url(transparentURL, {
      // resouce_type: "raw"
      sign_url: true,
      secure: true,
      custom_pre_function: {
        function_type: "remote",
        source: `${baseURL}?${qs.stringify(queryStringParameters)}`,
      },
      fetch_format: "png",
    });

    console.log({
      params: `${qs.stringify(queryStringParameters)}`,
      imageUrl: imageUrl,
    });

    return {
      statusCode: 302,
      headers: {
        Location: imageUrl,
      },
      body: "",
    };
  } catch (e) {
    console.log(e);
  }
};
