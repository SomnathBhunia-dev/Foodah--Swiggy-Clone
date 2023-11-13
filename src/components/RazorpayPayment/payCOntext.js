// make payment using razorpay

const orderSuccess = (e) => {
    let OrderAds = state.address.filter((i) => {
      return i.Default === true;
    });
    console.log(typeof OrderAds);
    let OrderItem = {
      Order_id: e.razorpay_order_id,
      Payment_id: e.razorpay_payment_id,
      Order_Date: Date.now(),
      Order_address: OrderAds[0],
      Order_amount: state.Sub_Total,
      fee: state.shipFee,
      item: [...state.Cart],
    };
    dispatch({ type: "TXN_SUCCESS", payload: OrderItem });
  };

  const onScriptLoad = async () => {
    const res = await initiatePayment();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    let orderAmount = Math.round(state.Sub_Total * 10);
    // Make API call to the serverless API
    const data = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Sub_Total: orderAmount }),
    }).then((t) => t.json());

    var options = {
      key: Kid,
      name: "Guruji Meals Pvt Ltd",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for Testing My Website Payment integration system",
      image:
        "https://cdn.telanganatoday.com/wp-content/uploads/2022/12/AI-1.jpg",
      handler: function (response) {
        orderSuccess(response);
        router.push("/recentOrder");
      },
      prefill: {
        name: "Test Drive",
        email: "testdrive@gmail.com",
        contact: "9898525231",
      },
      theme: {
        color: "#9333ea",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const initiatePayment = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = () => {
    if (state.address.length === 0) {
      dispatch({
        type: "ALERT",
        payload: {
          massage: "Plz Add a Delivery Address before making an Payment ",
          type: "danger",
        },
      });
    } else {
      onScriptLoad();
    }
  };