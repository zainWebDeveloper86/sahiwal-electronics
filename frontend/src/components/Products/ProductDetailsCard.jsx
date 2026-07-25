import React from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles.js";
import { toast } from "react-toastify";
import { axiosServerInstance, backend_url } from "../../server.js";
import { useProductActions } from "../hooks/useProductActions.js";
import { getAverageRating } from "../hooks/getAverageRating.js";
import Ratings from "../Common/Rating.jsx";
import { useSelector } from "react-redux";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const productId = data?._id;
  const rating = getAverageRating(data?.reviews);

  const {
    click,
    count,
    incrementCount,
    decrementCount,
    addToWishlistHandler,
    removeFromWishlistHandler,
    addToCartHandler,
  } = useProductActions(productId);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const userId = user._id;
      const groupTitle = data._id + userId;
      const sellerId = data.shop._id;
      await axiosServerInstance
        .post(`/conversation/create-new-conversation`, { groupTitle, userId, sellerId })
        .then((res) => {
          navigate(`/inbox?${res.data?.conversation?._id}`);
        })
        .catch((error) => {
          toast.error(error.response?.data?.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  if (!data) return null;

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-ink/50 z-40 flex items-center justify-center">
      <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-lg border border-divider relative p-4">
        <RxCross1
          size={26}
          className="absolute right-3 top-3 z-50 cursor-pointer text-ink/60 hover:text-ink"
          onClick={() => setOpen(false)}
        />

        <div className="block w-full 800px:flex">
          <div className="w-full 800px:w-[50%]">
            <img
              src={`${backend_url}${data?.images?.[0]?.url}`}
              alt={data.name}
              className="w-full object-contain max-h-[300px] bg-surface rounded-md"
            />

            <div className="flex items-center mt-4">
              <Link to={`/shop/preview/${data?.shop?._id}`} className="flex items-center">
                <img
                  src={`${backend_url}${data?.shop?.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2 object-cover border border-divider"
                />
                <div>
                  <h3 className={`${styles.shop_name}`}>{data?.shop?.name}</h3>
                  <Ratings rating={rating} />
                </div>
              </Link>
            </div>

            <button
              className="w-full mt-4 h-11 rounded-md bg-ink text-white font-body font-[500] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              onClick={handleMessageSubmit}
            >
              Send Message <AiOutlineMessage />
            </button>

            <h5 className="text-[14px] font-body text-copper mt-5">
              {data.sold_out || 0} sold
            </h5>
          </div>

          <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
            <h1 className={`${styles.productTitle} text-[20px]`}>{data.name}</h1>
            <p className="text-ink/60 text-sm mt-2 font-body">{data.description}</p>

            <div className="flex items-center gap-2 pt-3">
              <span className="price-tag text-[18px] text-voltage">
                ${data.discountPrice}
              </span>
              {data.originalPrice && (
                <span className="price-tag text-xs text-ink/40 line-through">
                  ${data.originalPrice}
                </span>
              )}
            </div>

            <div className="flex items-center mt-12 justify-between pr-3">
              <div className="flex items-center border border-divider rounded-md overflow-hidden">
                <button
                  className="bg-surface text-ink font-[600] px-4 py-2 hover:bg-divider transition-colors"
                  onClick={decrementCount}
                >
                  -
                </button>
                <span className="px-4 py-[9px] font-mono text-ink">{count}</span>
                <button
                  className="bg-surface text-ink font-[600] px-4 py-2 hover:bg-divider transition-colors"
                  onClick={incrementCount}
                >
                  +
                </button>
              </div>
              <div>
                {click ? (
                  <AiFillHeart
                    size={28}
                    className="cursor-pointer"
                    onClick={() => removeFromWishlistHandler(data)}
                    color="#F5A623"
                    title="Remove from wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    size={28}
                    className="cursor-pointer"
                    onClick={() => addToWishlistHandler(data)}
                    color="#131A2B"
                    title="Add to wishlist"
                  />
                )}
              </div>
            </div>

            <button
              className="w-full mt-6 h-11 rounded-md bg-voltage text-white font-body font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              onClick={() => addToCartHandler(data)}
            >
              Add to cart <AiOutlineShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;