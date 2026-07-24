import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { axiosServerInstance, backend_url } from "../../server.js";
import styles from "../../styles/styles.js";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/product.js";
import Loader from "../Common/Loader.jsx";
import { toast } from "react-toastify";
import Ratings from "../Common/Rating.jsx";

const ShopInfo = ({ isOwner }) => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { allProducts } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id) {
      if (!allProducts) {
        dispatch(getAllProducts());
      }
      setIsLoading(true);
      axiosServerInstance
        .get(`/shop/get-shop-info/${id}`)
        .then((res) => {
          setData(res.data.shop);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, [id, dispatch]);

  const shopProducts = allProducts?.filter((p) => p.shopId === id) || [];

  //  Calculate weighted average rating (real-world standard)
  const calculateShopRating = () => {
    if (shopProducts.length === 0) return 0;

    let totalRatingSum = 0;
    let totalReviewCount = 0;

    shopProducts.forEach((product) => {
      const rating = product.ratings || 0;
      const reviewCount = product.reviews?.length || 0;
      totalRatingSum += rating * reviewCount;
      totalReviewCount += reviewCount;
    });

    // If no reviews at all, return 0
    if (totalReviewCount === 0) return 0;

    return totalRatingSum / totalReviewCount;
  };

  const shopRating = calculateShopRating();
  const totalReviews = shopProducts.reduce(
    (acc, product) => acc + (product.reviews?.length || 0),
    0,
  );

  const logoutHandler = async () => {
    axiosServerInstance
      .get("/shop/logout-seller")
      .then((res) => {
        toast.success(res.data.message);
        navigate("/shop-login");
        dispatch({ type: "LogoutSeller" });
      })
      .catch((error) => {
        console.log(error.response?.data?.message || "Logout failed");
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* Avatar */}
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              <img
                src={`${backend_url}${data?.avatar?.url}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px] font-semibold">
              {data?.name}
            </h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {data?.description}
            </p>
          </div>

          {/* Shop Details */}
          <div className="p-3 border-b border-gray-100">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{data?.address}</h4>
          </div>

          <div className="p-3 border-b border-gray-100">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{data?.phoneNumber}</h4>
          </div>

          <div className="p-3 border-b border-gray-100">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{shopProducts?.length || 0}</h4>
          </div>

          {/*  Updated: Shop Ratings with Stars */}
          <div className="p-3 border-b border-gray-100">
            <h5 className="font-[600]">Shop Ratings</h5>
            <div className="flex items-center gap-3 mt-1">
              {shopRating > 0 ? (
                <>
                  <Ratings rating={shopRating} />
                  <span className="text-sm font-medium text-gray-700">
                    {shopRating.toFixed(1)} / 5
                  </span>
                  <span className="text-sm text-gray-500">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </>
              ) : (
                <span className="text-gray-400">No ratings yet</span>
              )}
            </div>
          </div>

          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {data?.createdAt
                ? new Date(data.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </h4>
          </div>

          {/* Owner Actions */}
          {isOwner && (
            <div className="py-3 px-4 space-y-3">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px] !bg-[#e94560] hover:!bg-[#c0392b]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
