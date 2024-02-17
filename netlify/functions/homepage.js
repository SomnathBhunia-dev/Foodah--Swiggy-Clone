const axios = require('axios');

exports.handler = async (event, context) => {
    try {
        const data = {
            collection: 'Data',
            database: 'Foodah',
            dataSource: 'Foodah',
        };

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': process.env.HOMEPAGE_API_KEY,
            }
        };

        const response = await axios.post('https://ap-south-1.aws.data.mongodb-api.com/app/data-lvecc/endpoint/data/v1/action/findOne', data, config);
        const responseData = response.data;
                
        return {
            statusCode: 200,
            body: JSON.stringify(responseData.document)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' })
        };
    }
};