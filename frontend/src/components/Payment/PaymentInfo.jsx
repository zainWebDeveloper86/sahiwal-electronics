import React, { useState } from "react";
import styles from "../../styles/styles.js";

const PaymentInfo = ({ cashOnDeliveryHandler }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    setIsProcessing(true);
    try {
      await cashOnDeliveryHandler(e);
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="w-full 800px:w-[95%] bg-[#fff] rounded-md p-5 pb-8">
      {/* Cash on Delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div className="w-[25px] h-[25px] rounded-full bg-[#f63b60] border-[3px] border-[#f63b60] relative flex items-center justify-center">
            <div className="w-[13px] h-[13px] bg-white rounded-full" />
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        <div className="w-full flex pb-4">
          <form className="w-full" onSubmit={handleSubmit}>
            <p className="text-gray-500 text-sm mb-4">
              Pay when you receive your order. No online payment required.
            </p>
            <input
              type="submit"
              value={isProcessing ? "Placing Order..." : "Confirm Order"}
              disabled={isProcessing}
              className={`${styles.button} !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
