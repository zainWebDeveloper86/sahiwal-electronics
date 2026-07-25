import React from "react";
import styles from "../../styles/styles.js";

const CheckoutSteps = ({ active }) => {
  const getStepClass = (step) => {
    if (active >= step) {
      return "bg-voltage text-white";
    }
    return "bg-surface text-ink/40";
  };

  const getConnectorClass = (step) => {
    if (active >= step) {
      return "bg-voltage";
    }
    return "bg-divider";
  };

  return (
    <div className="w-full flex justify-center py-4">
      <div className="w-[90%] 800px:w-[50%] flex items-center justify-center">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold text-sm transition-colors ${getStepClass(1)}`}
          >
            1
          </div>
          <span className="text-xs font-body text-ink/50 ml-1 800px:inline hidden">Shipping</span>
          <div className={`w-[30px] 800px:w-[70px] h-[3px] transition-colors ${getConnectorClass(2)}`} />
        </div>

        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold text-sm transition-colors ${getStepClass(2)}`}
          >
            2
          </div>
          <span className="text-xs font-body text-ink/50 ml-1 800px:inline hidden">Payment</span>
          <div className={`w-[30px] 800px:w-[70px] h-[3px] transition-colors ${getConnectorClass(3)}`} />
        </div>

        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold text-sm transition-colors ${getStepClass(3)}`}
          >
            3
          </div>
          <span className="text-xs font-body text-ink/50 ml-1 800px:inline hidden">Success</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;