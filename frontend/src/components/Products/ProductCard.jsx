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

  const {
    click,
    incrementCount,
    decrementCount,
    addToWishlistHandler,
    removeFromWishlistHandler,
    addToCartHandler,
  } = useProductActions(productId);

  const detailsLink =
    isEvent === true ? `/product/${productId}?isEvent=true` : `/product/${productId}`;

  return (
    <div className="w-full h-[370px] bg-white border border-divider rounded-lg p-3 relative hover:shadow-md transition-shadow">
      <Link to={detailsLink}>
        <img
          src={`${backend_url}${data?.images[0]?.url}`}
          alt={data?.name || "Product image"}
          className="w-full h-[170px] object-contain bg-surface rounded-md"
        />
      </Link>

      <Link to={`/shop/preview/${data?.shop?._id}`}>
        <h5 className={`${styles.shop_name}`}>{data?.shop?.name}</h5>
      </Link>

      <Link to={detailsLink}>
        <h4 className="pb-3 font-body font-[500] text-ink truncate">
          {data?.name?.length > 40 ? data?.name.slice(0, 40) + "..." : data?.name}
        </h4>

        <div className="flex">
          <Rating rating={data?.ratings || 0} />
        </div>

        <div className="py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {data.originalPrice && (
              <span className="price-tag text-xs text-ink/40 line-through">
                ${data.originalPrice}
              </span>
            )}
            <span className="price-tag text-[16px] text-voltage">
              ${data.discountPrice}
            </span>
          </div>
          <span className="font-body font-[400] text-[14px] text-stock">
            {data?.sold_out || 0} sold
          </span>
        </div>
      </Link>

      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => removeFromWishlistHandler(data)}
            color="#F5A623"
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => addToWishlistHandler(data)}
            color="#131A2B"
            title="Add to wishlist"
          />
        )}

        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#131A2B"
          title="Quick view"
        />

        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          onClick={() => addToCartHandler(data)}
          color="#2F5FF6"
          title="Add to cart"
        />

        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </div>
  );
};

export default ProductCard;
