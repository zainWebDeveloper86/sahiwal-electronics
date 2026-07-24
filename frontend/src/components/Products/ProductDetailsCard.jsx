import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.js";
import { toast } from "react-toastify";
import { backend_url } from "../../server.js";
import { useProductActions } from "../hooks/useProductActions.js";
import { getAverageRating } from "../hooks/getAverageRating.js";
import Ratings from "../Common/Rating.jsx";

const ProductDetailsCard = ({ setOpen, data }) => {
  const productId = data?._id;
  const rating = getAverageRating(data?.reviews);

  // takin logic from hook
  const {
    click,
    count,
    incrementCount,
    decrementCount,
    addToWishlistHandler,
    removeFromWishlistHandler,
    addToCartHandler,
  } = useProductActions(productId);

  const handleMessageSubmit = () => {
    toast.info("Messaging feature coming soon!");
  };

  if (!data) return null;

  return (
    <div className="bg-[#fff]">
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
        <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
          {/* Close Button */}
          <RxCross1
            size={30}
            className="absolute right-3 top-3 z-50 cursor-pointer"
            onClick={() => setOpen(false)}
          />

          <div className="block w-full 800px:flex">
            {/* Left: Image */}
            <div className="w-full 800px:w-[50%]">
              <img
                src={`${backend_url}${data?.images?.[0]?.url}`}
                alt={data.name}
                className="w-full object-contain max-h-[300px]"
              />

              {/* Seller Info */}
              <div className="flex items-center mt-4">
                <Link
                  to={`/shop/preview/${data?.shop?._id}`}
                  className="flex items-center"
                >
                  <img
                    src={`${backend_url}${data?.shop?.avatar?.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2 object-cover"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>
                      {data?.shop?.name}
                    </h3>
                    {/* <h5 className="pb-3 text-[15px]">
                      ({data?.shop?.ratings || 0}) Ratings
                    </h5> */}
                    <Ratings rating={rating} />
                  </div>
                </Link>
              </div>

              {/* Send Message */}
              <div
                className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                onClick={handleMessageSubmit}
              >
                <span className="text-[#fff] flex items-center">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>

              <h5 className="text-[16px] text-[red] mt-5">
                ({data.sold_out || 0}) Sold out
              </h5>
            </div>

            {/* Right: Product Details */}
            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
              <h1 className={`${styles.productTitle} text-[20px]`}>
                {data.name}
              </h1>
              <p className="text-gray-600 text-sm mt-2">{data.description}</p>

              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  ${data.discountPrice}
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.originalPrice ? `$${data.originalPrice}` : null}
                </h3>
              </div>

              {/* Quantity & Wishlist */}
              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                    {count}
                  </span>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => removeFromWishlistHandler(data)}
                      color="red"
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishlistHandler(data)}
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              <div
                className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                onClick={() => addToCartHandler(data)}
              >
                <span className="text-[#fff] flex items-center">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsCard;
