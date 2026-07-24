import React from "react";

const PaymentCartData = ({ orderData }) => {
  //  Ensure all values are numbers
  const subtotal = Number(orderData?.subTotalPrice) || 0;
  const shipping = Number(orderData?.shipping) || 0;
  const discount = Number(orderData?.discountPrice) || 0;
  const total = Number(orderData?.totalPrice) || 0;

  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subtotal.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {discount > 0 ? `- $${discount.toFixed(2)}` : "$0.00"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[700] text-end pt-3 text-[#f63b60]">
        Total: ${total.toFixed(2)}
      </h5>
      <br />
    </div>
  );
};

export default PaymentCartData;