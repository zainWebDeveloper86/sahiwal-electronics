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
    <div className="w-full bg-white border border-divider rounded-lg p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-body text-ink/60">Subtotal:</h3>
        <h5 className="text-[18px] font-body font-semibold text-ink">${subTotalPrice.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-body text-ink/60">Shipping:</h3>
        <h5 className="text-[18px] font-body font-semibold text-ink">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b border-divider pb-3">
        <h3 className="text-[16px] font-body text-ink/60">Discount:</h3>
        <h5 className="text-[18px] font-body font-semibold text-stock">
          {discountPercentenge > 0
            ? `- $${discountPercentenge.toFixed(2)}`
            : "$0.00"}
        </h5>
      </div>
      {couponCodeData?.name && (
        <div className="flex justify-between text-sm font-body text-stock font-medium pb-3 border-b border-divider border-dashed">
          <span>Applied Coupon:</span>
          <span className="uppercase font-display">{couponCodeData?.name}</span>
        </div>
      )}
      <h5 className="text-[18px] font-display font-bold text-end pt-3 text-copper">
        Total: ${totalPrice}
      </h5>
      <br />
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-body font-medium text-ink mb-1">
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
          <button
            type="submit"
            className="h-[40px] px-4 border border-voltage text-voltage rounded-md font-body font-medium hover:bg-voltage hover:text-white transition-colors cursor-pointer"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
};

export default CartData;