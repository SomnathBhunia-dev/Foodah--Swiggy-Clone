const express = require("express");
const Razorpay = require("razorpay");
require('dotenv').config();

const router = express.Router();
module.exports = router ;

router.post("/orders", async (req, res) => {
    const { Sub_Total } = req.body
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

        if (!order) return res.status(500).send("Some error occured");

        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount
        });
    } catch (error) {
        res.status(500).send(error);
    }
});


// const Kid = 'rzp_test_X9N3RMOTxwkz8l';
// const SecretKey = 'p7bDWob6BS3gj4I378YsFDpR';

// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     // Initialize razorpay object

//     // Create an order -> generate the OrderID -> Send it to the Front-end
//     // Also, check the amount and currency on the backend (Security measure)


//     try {
//       const response = await instance.orders.create(options);
//       res.status(200).json({
//         id: response.id,
//         currency: response.currency,
//         amount: response.amount
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(400).json(err);
//     }
//   } else {
//     // Handle any other HTTP method
//   }
// }