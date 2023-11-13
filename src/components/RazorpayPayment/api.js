const Razorpay = require('razorpay');

const Kid = 'rzp_test_X9N3RMOTxwkz8l';
const SecretKey = 'p7bDWob6BS3gj4I378YsFDpR';

export default async function handler(req, res) {
  const { Sub_Total } = req.body
  console.log(Sub_Total)
  if (req.method === "POST") {
    // Initialize razorpay object
    var instance = new Razorpay({ key_id: Kid, key_secret: SecretKey })

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)

    const options = {
      amount: Sub_Total * 100,
      currency: "INR",
      receipt: "receipt#1",
    };

    try {
      const response = await instance.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}

