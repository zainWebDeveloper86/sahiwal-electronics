import React from "react";
import CheckoutSteps from "../../components/Checkout/CheckoutSteps.jsx";
import Checkout from "../../components/Checkout/Checkout.jsx";

const CheckoutPage = () => {
  return (
    <div>
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
    </div>
  );
};

export default CheckoutPage;
