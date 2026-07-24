import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/animations/success.json";
import styles from "../../styles/styles.js";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-3">
      <div className="w-[300px] h-[300px]">
        <Player
          autoplay
          loop={true}
          src={animationData}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      <h5 className="text-center text-2xl md:text-3xl font-semibold text-gray-700 mt-4">
        Your order is successful 😍
      </h5>
      <p className="text-center text-gray-500 text-sm md:text-base mt-2">
        Thank you for shopping with us! We'll notify you when your order is on its way.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button
          onClick={() => navigate("/")}
          className={`${styles.button} !bg-[#f63b60] text-white px-8 py-3 rounded-lg hover:opacity-90 transition`}
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="border border-[#f63b60] text-[#f63b60] px-8 py-3 rounded-lg hover:bg-[#f63b60] hover:text-white transition"
        >
          View Orders
        </button>
      </div>
    </div>
  );
};

export default OrderSuccessPage;