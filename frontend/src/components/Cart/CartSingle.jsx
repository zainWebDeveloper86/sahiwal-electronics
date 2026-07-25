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
    <div className="border-b border-divider p-4 hover:bg-surface/50 transition-colors duration-200">
      <div className="w-full flex items-center gap-3">
        <button
          onClick={removeHandler}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:text-copper text-ink/40 transition-all duration-200 cursor-pointer"
          title="Remove item"
        >
          <RxCross1 size={16} />
        </button>

        <img
          src={`${backend_url}${data?.images?.[0]?.url}`}
          alt={data.name}
          className="flex-shrink-0 w-[72px] h-[72px] object-cover rounded-lg border border-divider bg-surface"
        />

        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-body font-medium text-ink line-clamp-2 leading-tight">
            {data.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-2 mt-1">
            <span className="text-sm text-ink/50 font-body">
              ${data.discountPrice || data.originalPrice} × {value}
            </span>
            <span className="price-tag text-sm text-voltage">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 flex items-center border border-divider rounded-lg overflow-hidden bg-white w-25 mt-2">
        <button
          onClick={decrement}
          disabled={value <= 1}
          className={`w-8 h-8 flex items-center justify-center text-ink/60 transition-colors duration-200 ${
            value <= 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-surface active:bg-divider"
          }`}
        >
          <HiOutlineMinus size={16} />
        </button>
        <span className="w-9 h-8 flex items-center justify-center text-sm font-mono font-semibold text-ink border-x border-divider bg-surface">
          {value}
        </span>
        <button
          onClick={increment}
          className="w-8 h-8 flex items-center justify-center text-ink/60 hover:bg-surface active:bg-divider transition-colors duration-200"
        >
          <HiPlus size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartSingle;