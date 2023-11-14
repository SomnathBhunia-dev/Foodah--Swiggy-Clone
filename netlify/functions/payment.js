const Razorpay = require("razorpay");
require('dotenv').config();

exports.handler = async function (event, context) {
    const { Sub_Total } = JSON.parse(event.body);
    
    try {
        const instance = new Razorpay({
            key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
            key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
        });

        const options = {
            amount: Sub_Total,
            currency: "INR",
            receipt: "receipt#1",
        };

        const order = await instance.orders.create(options);

        if (!order) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Failed to create Razorpay order' }),
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({
                id: order.id,
                currency: order.currency,
                amount: order.amount,
                status: order.status,  // Include additional details
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
        };
    }
};
