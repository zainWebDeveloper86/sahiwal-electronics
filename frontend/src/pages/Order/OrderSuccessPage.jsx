import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animations/success.json";
import styles from "../../styles/styles.js";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10 bg-surface">
      <div className="bg-white border border-divider rounded-lg p-8 md:p-12 max-w-2xl w-full mx-4 shadow-sm">
        <div className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] mx-auto">
          <Player
            autoplay
            loop={true}
            src={animationData}
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        <h5 className="text-center text-2xl md:text-3xl font-display font-bold text-ink mt-4">
          Your order is successful 😍
        </h5>
        <p className="text-center font-body text-ink/60 text-sm md:text-base mt-2 max-w-md mx-auto">
          Thank you for shopping with us! We'll notify you when your order is on its way.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className={`${styles.button} px-8 py-3 rounded-lg text-[16px] font-body font-medium`}
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="border-2 border-voltage text-voltage px-8 py-3 rounded-lg font-body font-medium hover:bg-voltage hover:text-white transition-all duration-300"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;