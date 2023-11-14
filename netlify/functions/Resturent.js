const axios = require("axios");
require('dotenv').config();

exports.handler = async function (event, context) {

    const restaurantFetchLink = process.env.RESTURENT_FETCH_URL
    const customHeaders = {
        'User-Agent': process.env.DESKTOP_USER_AGENT,
      };
    try {
       // Accessing restaurantId from queryStringParameters
       const restaurantId = event.path.split("/").pop();
  console.log(restaurantId)
        const response = await axios.get(`${restaurantFetchLink}${restaurantId}`, {
            headers: customHeaders,
        });
        const modifiedData = response.data;
        return {
            statusCode: 200,
            body: JSON.stringify(modifiedData),
          };
  
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
          };
    }
  };