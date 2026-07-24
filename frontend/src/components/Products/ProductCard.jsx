import React, { useState } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/styles.js";
import ProductDetailsCard from "../Products/ProductDetailsCard.jsx";
import Rating from "../Common/Rating.jsx";
import { backend_url } from "../../server.js";
import { useProductActions } from "../hooks/useProductActions.js";

const ProductCard = ({ data, isEvent }) => {
  const [open, setOpen] = useState(false);
  const productId = data?._id;

  // Hook se saari logic lelo
  const {
    click,
    count,
    incrementCount,
    decrementCount,
    addToWishlistHandler,
    removeFromWishlistHandler,
    addToCartHandler,
  } = useProductActions(productId);

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      {/* Product Image */}
      <Link
        to={
          isEvent === true
            ? `/product/${productId}?isEvent=true`
            : `/product/${productId}`
        }
      >
        <img
          src={`${backend_url}${data?.images[0]?.url}`}
          alt=""
          className="w-full h-[170px] object-contain"
        />
      </Link>

      {/* Shop Name */}
      <Link to={`/shop/preview/${data?.shop?._id}`}>
        <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
      </Link>

      {/* Product Name */}
      <Link
        to={
          isEvent === true
            ? `/product/${productId}?isEvent=true`
            : `/product/${productId}`
        }
      >
        <h4 className="pb-3 font-[500]">
          {data?.name?.length > 40
            ? data?.name.slice(0, 40) + "..."
            : data?.name}
        </h4>

        {/* Ratings */}
        <div className="flex">
          <Rating rating={data?.ratings || 0} />
        </div>

        {/* Price & Sold */}
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={`${styles.productDiscountPrice}`}>
              ${data.discountPrice}
            </h5>
            <h4 className={`${styles.price}`}>
              {data.originalPrice ? `$${data.originalPrice}` : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data?.sold_out || 0} sold
          </span>
        </div>
      </Link>

      {/* Action Buttons */}
      <div>
        {/* Wishlist */}
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => removeFromWishlistHandler(data)}
            color="red"
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => addToWishlistHandler(data)}
            color="#333"
            title="Add to wishlist"
          />
        )}

        {/* Quick View */}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        />

        {/* Add to Cart */}
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => addToCartHandler(data)}
          color="#444"
          title="Add to cart"
        />

        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </div>
  );
};

export default ProductCard;
