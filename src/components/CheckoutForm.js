import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import authHeader from '../services/AuthHeader'

const CheckoutForm = ({ price }) => {
  const publishableKey = "pk_test_51IAwugAOVKdxamtZJJQ8WWhUjT4K4AiwAzMcympZKcreniKrpBFZLTqkPEodvBLEy8sjC17HCCbTmMHJ3jUFQQEM00IEbaXFDH";
  const stripePrice = price * 100;

  const onToken = (token) => {
    console.log(token);
    axios
      .post("http://localhost:5000/payment", {
          headers: authHeader(),
        amount: stripePrice,
        token,
      })
      .then((response) => {
        console.log(response);
        alert("payment success");
      })
      .catch((error) => {
        console.log(error);
        alert("Payment failed");
      });
  };

  return (
    <StripeCheckout
      amount={stripePrice}
      label="Pay Now"
      name="Total bill"
      // image="https://svgshare.com/i/CUz.svg"
      description={`Your total is €` + price}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
      currency="EUR"
    />
  );
};

export default CheckoutForm;