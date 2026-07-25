import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "../../styles/styles.js";
import CountDown from "./CountDown.jsx";
import { backend_url } from "../../server.js";
import { addTocart } from "../../redux/actions/cart.js";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";

const EventCard = ({ active, data, onExpire }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addToCartHandler = (item) => {
    const existingItem = cart && cart.find((i) => i._id === item._id);
    if (existingItem) {
      const updatedItem = { ...existingItem, qty: existingItem.qty + 1 };
      dispatch(addTocart(updatedItem));
      toast.success(`Quantity increased to ${updatedItem.qty}!`);
    } else {
      if (item.stock < 1) {
        toast.error(`Out of stock!`);
      } else {
        dispatch(addTocart({ ...item, qty: 1 }));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <div
      className={`w-full h-[400px] bg-white border border-divider rounded-lg hover:shadow-md transition-shadow overflow-hidden ${
        active ? "" : "mb-6"
      }`}
    >
      <div className="relative w-full h-[170px] overflow-hidden bg-surface">
        <img
          src={`${backend_url}${data?.images?.[0]?.url}`}
          alt={data?.name || "Event image"}
          className="w-full h-full object-contain"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />
        {data?.discountPrice && data?.originalPrice && (
          <div className="absolute top-2 left-2 bg-copper text-white text-xs font-body font-[600] px-2 py-0.5 rounded-full">
            {Math.round(
              ((data.originalPrice - data.discountPrice) / data.originalPrice) * 100,
            )}
            % OFF
          </div>
        )}
        {data?.stock === 0 && (
          <div className="absolute inset-0 bg-ink/60 flex items-center justify-center">
            <span className="text-white text-sm font-display font-[600] bg-ink px-4 py-1 rounded-lg">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col h-[230px]">
        <h2 className="text-[15px] font-display font-[600] text-ink truncate">
          {data?.name}
        </h2>

        <p className="text-xs text-ink/60 font-body line-clamp-1 mt-1">
          {data?.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            {data?.originalPrice && (
              <span className="price-tag text-xs text-ink/40 line-through">
                ${data.originalPrice}
              </span>
            )}
            <span className="price-tag text-[16px] text-voltage">
              ${data?.discountPrice}
            </span>
          </div>
          <span className="text-xs text-ink/50 font-body">
            {data?.sold_out || 0} sold
          </span>
        </div>

        <div className="mt-2 flex items-center justify-center">
          <CountDown data={data} onExpire={onExpire} />
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <Link to={`/product/${data._id}?isEvent=true`} className="flex-1">
            <button className="w-full h-[36px] bg-white border border-voltage text-voltage rounded-lg text-xs font-body font-[600] flex items-center justify-center gap-1 hover:bg-voltage hover:text-white transition-colors">
              <BiDetail size={16} />
              Details
            </button>
          </Link>
          <button
            className="flex-1 h-[36px] bg-voltage text-white rounded-lg text-xs font-body font-[600] flex items-center justify-center gap-1 hover:opacity-90 transition-opacity disabled:opacity-40"
            onClick={() => addToCartHandler(data)}
            disabled={data?.stock === 0}
          >
            <AiOutlineShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;