import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles.js";
import Ratings from "../Common/Rating.jsx";
import { axiosServerInstance, backend_url } from "../../server.js";
import ProductDetailsInfo from "./ProductDetailsInfo.jsx";
import { useProductActions } from "../hooks/useProductActions.js";
import { getAverageRating } from "../hooks/getAverageRating.js";
import { toast } from "react-toastify";

const ProductDetails = ({ data }) => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);
  const [select, setSelect] = useState(0);

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

  const shopProducts =
    allProducts && data?.shop?._id
      ? allProducts.filter((i) => i.shop?._id === data.shop._id)
      : [];

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const userId = user._id;
      const groupTitle = data._id + userId;
      const sellerId = data.shop._id;
      await axiosServerInstance
        .post(`/conversation/create-new-conversation`, { groupTitle, userId, sellerId })
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please login to create a conversation");
    }
  };

  if (!data) return null;

  return (
    <div className="bg-white">
      <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
        <div className="w-full py-5">
          <div className="block w-full 800px:flex">
            <div className="w-full lg:w-1/2">
              <div className="w-full h-[500px] overflow-hidden flex items-center justify-center pr-4 rounded-lg">
                <img
                  src={`${backend_url}${data.images?.[select]?.url}`}
                  alt={data.name}
                  className="w-full h-full object-contain transition-transform duration-300"
                />
              </div>

              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {data.images.map((i, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 bg-surface ${
                      select === index
                        ? "border-voltage shadow-md"
                        : "border-divider hover:border-ink/30"
                    }`}
                    onClick={() => setSelect(index)}
                  >
                    <img
                      src={`${backend_url}${i.url}`}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full 800px:w-[50%] pt-5 800px:pl-8">
              <h1 className={`${styles.productTitle}`}>{data.name}</h1>
              <p className="text-ink/60 font-body mt-2">{data.description}</p>
              <div className="flex items-center gap-2 pt-3">
                <span className="price-tag text-[20px] text-voltage">
                  ${data.discountPrice}
                </span>
                {data.originalPrice && (
                  <span className="price-tag text-sm text-ink/40 line-through">
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

              <div className="flex items-center pt-8 flex-wrap gap-3">
                <img
                  src={`${backend_url}${data?.shop?.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full border border-divider object-cover"
                />
                <div className="pr-4">
                  <Link to={`/shop/preview/${data?.shop?._id}`}>
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop?.name}
                    </h3>
                  </Link>
                  <Ratings rating={rating} />
                </div>
                <button
                  className="h-11 px-5 rounded-md bg-ink text-white font-body font-[500] flex items-center gap-2 hover:opacity-90 transition-opacity"
                  onClick={handleMessageSubmit}
                >
                  Send Message <AiOutlineMessage />
                </button>
              </div>
            </div>
          </div>
        </div>

        <ProductDetailsInfo data={data} shopProducts={shopProducts} />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ProductDetails;