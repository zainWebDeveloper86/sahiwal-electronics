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
          toast.error(error);
          setIsLoading(false);
        });
    }
  }, [id, dispatch]);

  const shopProducts = allProducts?.filter((p) => p.shopId === id) || [];

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
      .post("/shop/logout-seller")
      .then((res) => {
        toast.success(res.data.message);
        // Remove seller token from localStorage
        localStorage.removeItem("seller_token");
        
        dispatch({ type: "LogoutSeller" });
        navigate("/shop-login");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Logout failed");
      });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex item-center justify-center">
              <img
                src={`${backend_url}${data?.avatar?.url}`}
                alt=""
                className="w-[150px] h-[150px] object-cover rounded-full border-4 border-divider"
              />
            </div>
            <h3 className="text-center py-2 text-[20px] font-display font-semibold text-ink">
              {data?.name}
            </h3>
            <p className="text-[15px] font-body text-ink/60 p-[10px] flex items-center">
              {data?.description}
            </p>
          </div>

          <div className="p-3 border-b border-divider">
            <h5 className="font-body font-[600] text-ink">Address</h5>
            <h4 className="font-body text-ink/60">{data?.address}</h4>
          </div>

          <div className="p-3 border-b border-divider">
            <h5 className="font-body font-[600] text-ink">Phone Number</h5>
            <h4 className="font-mono text-ink/60">{data?.phoneNumber}</h4>
          </div>

          <div className="p-3 border-b border-divider">
            <h5 className="font-body font-[600] text-ink">Total Products</h5>
            <h4 className="font-mono text-ink/60">
              {shopProducts?.length || 0}
            </h4>
          </div>

          <div className="p-3 border-b border-divider">
            <h5 className="font-body font-[600] text-ink">Shop Ratings</h5>
            <div className="flex items-center gap-3 mt-1">
              {shopRating > 0 ? (
                <>
                  <Ratings rating={shopRating} />
                  <span className="text-sm font-mono font-medium text-ink/70">
                    {shopRating.toFixed(1)} / 5
                  </span>
                  <span className="text-sm font-body text-ink/40">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                  </span>
                </>
              ) : (
                <span className="text-ink/40 font-body">No ratings yet</span>
              )}
            </div>
          </div>

          <div className="p-3">
            <h5 className="font-body font-[600] text-ink">Joined On</h5>
            <h4 className="font-body text-ink/60">
              {data?.createdAt
                ? new Date(data.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"}
            </h4>
          </div>

          {isOwner && (
            <div className="py-3 px-4 flex flex-col gap-2">
              <Link to="/settings">
                <div className="w-full h-[42px] rounded-md bg-voltage flex items-center justify-center hover:opacity-90 transition-opacity">
                  <span className="text-white font-body font-[500]">
                    Edit Shop
                  </span>
                </div>
              </Link>
              <div
                className="w-full h-[42px] rounded-md bg-copper flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
                onClick={logoutHandler}
              >
                <span className="text-white font-body font-[500]">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ShopInfo;
