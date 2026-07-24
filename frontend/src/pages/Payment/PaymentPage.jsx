import React from 'react';
import CheckoutSteps from '../../components/Checkout/CheckoutSteps.jsx';
import Payment from '../../components/Payment/Payment.jsx';

const PaymentPage = () => {
  return (
    <div className='w-full min-h-screen bg-[#f6f9fc]'>
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
    </div>
  );
};

export default PaymentPage;