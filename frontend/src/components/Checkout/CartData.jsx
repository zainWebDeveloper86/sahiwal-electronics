import React from "react";
import styles from "../../styles/styles.js";

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
  couponCodeData,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600] text-green-600">
          {discountPercentenge > 0
            ? `- $${discountPercentenge.toFixed(2)}`
            : "$0.00"}
        </h5>
      </div>
      {couponCodeData?.name && (
        <div className="flex justify-between text-sm text-green-600 font-medium pb-3 border-b border-dashed border-gray-300">
          <span>Applied Coupon:</span>
          <span className="uppercase">{couponCodeData?.name}</span>
        </div>
      )}
      <h5 className="text-[18px] font-[700] text-end pt-3 text-[#f63b60]">
        Total: ${totalPrice}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Apply Coupon Code
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            className={`${styles.input} h-[40px] pl-2 flex-1`}
            placeholder="Enter coupon code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
          <input
            className={`h-[40px] px-4 border border-[#f63b60] text-[#f63b60] rounded-[3px] cursor-pointer hover:bg-[#f63b60] hover:text-white transition-colors`}
            value="Apply"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default CartData;
