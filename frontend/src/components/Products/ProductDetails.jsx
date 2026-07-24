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

  // get logic from hook
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

  // const handleMessageSubmit = () => {
  //   navigate(`/inbox?conversation=885hfg484873840ijfuuer`);
  // };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const userId = user._id;
      const groupTitle = data._id + userId;
      const sellerId = data.shop._id;
      await axiosServerInstance
        .post(`/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
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
            {/* Left: Image Gallery */}
            <div className="w-full lg:w-1/2">
              {/* Main Image */}
              <div className="w-full h-[500px] overflow-hidden flex items-center justify-center pr-4">
                <img
                  src={`${backend_url}${data.images?.[select]?.url}`}
                  alt={data.name}
                  className="w-full h-full object-cover transition-transform duration-300 rounded-lg"
                />
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                {data.images.map((i, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                      select === index
                        ? "border-blue-600 shadow-lg"
                        : "border-gray-200 hover:border-gray-400"
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

            {/* Right: Product Info */}
            <div className="w-full 800px:w-[50%] pt-5">
              <h1 className={`${styles.productTitle}`}>{data.name}</h1>
              <p>{data.description}</p>
              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  ${data.discountPrice}
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.originalPrice ? `$${data.originalPrice}` : null}
                </h3>
              </div>

              {/* Quantity + Wishlist */}
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
                      color="#333"
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>

              {/* Add to Cart */}
              <div
                className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                onClick={() => addToCartHandler(data)} // ✅ data pass karo
              >
                <span className="text-white flex items-center">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>

              {/* Seller Info */}
              <div className="flex items-center pt-8">
                <img
                  src={`${backend_url}${data?.shop?.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div className="pr-8">
                  <Link to={`/shop/preview/${data?.shop?._id}`}>
                    <h3 className={`${styles.shop_name} pb-1 pt-1`}>
                      {data.shop?.name}
                    </h3>
                  </Link>
                  {/* <h5 className="pb-3 text-[15px]">
                    ({data.shop?.ratings || 0}) Ratings
                  </h5> */}
                  <Ratings rating={rating} />
                </div>
                <div
                  className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-white flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: ProductDetailsInfo */}
        <ProductDetailsInfo data={data} shopProducts={shopProducts} />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ProductDetails;
