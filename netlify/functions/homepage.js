const axios = require("axios");
require('dotenv').config();

const customHeaders = {
    'User-Agent': process.env.DESKTOP_USER_AGENT,
};

exports.handler = async function (event, context) {
    try {

        const response = await axios.get(process.env.HOMEPAGE_URL, {
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