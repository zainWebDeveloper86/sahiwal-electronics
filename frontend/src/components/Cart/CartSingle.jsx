import React from "react";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { backend_url } from "../../server.js";
import { addTocart, removeFromCart } from "../../redux/actions/cart.js";
import { toast } from "react-toastify";

const CartSingle = ({ data }) => {
  const dispatch = useDispatch();
  const value = data.qty || 1;
  const totalPrice = (data?.discountPrice || data?.originalPrice || 0) * value;

  const increment = () => {
    dispatch(addTocart({ ...data, qty: value + 1 }));
  };

  const decrement = () => {
    if (value > 1) {
      dispatch(addTocart({ ...data, qty: value - 1 }));
    }
  };

  const removeHandler = () => {
    dispatch(removeFromCart(data));
    toast.success("Removed from cart!");
  };

  return (
    <div className="border-b border-gray-100 p-4 hover:bg-gray-50/50 transition-colors duration-200">
      <div className="w-full flex items-center gap-3">
        {/* 🗑️ Delete Icon */}
        <button
          onClick={removeHandler}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:text-red-500 text-gray-400 transition-all duration-200 cursor-pointer"
          title="Remove item"
        >
          <RxCross1 size={16} />
        </button>

        {/* 🖼️ Product Image */}
        <img
          src={`${backend_url}${data?.images?.[0]?.url}`}
          alt={data.name}
          className="flex-shrink-0 w-[72px] h-[72px] object-cover rounded-lg border border-gray-100"
        />

        {/* 📝 Product Details */}
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight">
            {data.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-2 mt-1">
            <span className="text-sm text-gray-500">
              ${data.discountPrice || data.originalPrice} × {value}
            </span>
            <span className="text-sm font-bold text-[#d02222]">
              = ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {/* ➖ Quantity Controls ➕ */}
      <div className="flex-shrink-0 flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white w-25 mt-2">
        <button
          onClick={decrement}
          disabled={value <= 1}
          className={`w-8 h-8 flex items-center justify-center text-gray-500 transition-colors duration-200 ${
            value <= 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:bg-gray-100 active:bg-gray-200"
          }`}
        >
          <HiOutlineMinus size={16} />
        </button>
        <span className="w-9 h-8 flex items-center justify-center text-sm font-semibold text-gray-700 border-x border-gray-200 bg-gray-50">
          {value}
        </span>
        <button
          onClick={increment}
          className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
        >
          <HiPlus size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartSingle;
