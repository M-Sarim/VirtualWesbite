const axios = require("axios");

exports.handler = async (event) => {
  const queryParams = event.queryStringParameters || {};
  const { q } = queryParams;

  if (!q) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query parameter" }),
    };
  }

  try {
    const apiKey = process.env.COMPANIES_HOUSE_API_KEY;
    const url = `https://api.company-information.service.gov.uk/search/companies?q=${encodeURIComponent(
      q
    )}`;
    const authHeader = `Basic ${Buffer.from(apiKey + ":").toString("base64")}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: authHeader,
      },
    });

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Replace '*' with your frontend domain for better security
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      },
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
