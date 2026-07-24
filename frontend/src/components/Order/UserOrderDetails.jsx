import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles.js";
import { getAllOrdersOfUser } from "../../redux/actions/order.js";
import { axiosServerInstance, backend_url } from "../../server.js";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";
import Loader from "../Common/Loader.jsx";

const UserOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.orders);

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Fetch orders only if user exists
  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  // Find current order
  const data = orders?.find((item) => item._id === id);

  // Safe user data
  const safeUser = {
    name: user?.name || "Guest",
    email: user?.email || "No email provided",
    phoneNumber: user?.phoneNumber || "N/A",
  };

  // Review Handler
  const reviewHandler = async (e) => {
    e?.preventDefault?.();

    if (!selectedItem) {
      toast.error("No item selected for review");
      return;
    }

    if (rating < 1) {
      toast.error("Please select a rating (1-5)");
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosServerInstance.put(`/product/create-new-review`, {
        user,
        rating,
        comment,
        productId: selectedItem._id,
        orderId: id,
      });
      toast.success("Review submitted successfully!");
      dispatch(getAllOrdersOfUser(user._id));
      setComment("");
      setRating(1);
      setOpen(false);
      setSelectedItem(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Refund Handler
  const refundHandler = async () => {
    if (!window.confirm("Are you sure you want to request a refund?")) {
      return;
    }

    setIsSubmitting(true);
    try {
      await axiosServerInstance.put(`/order/order-refund/${id}`, {
        status: "Processing refund",
      });
      toast.success("Refund request submitted successfully!");
      dispatch(getAllOrdersOfUser(user._id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to request refund");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg">Failed to load order: {error}</p>
      </div>
    );
  }

  // Order Not Found
  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Order not found!</p>
      </div>
    );
  }

  // Calculate total quantity
  const totalQty =
    data.cart?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0;

  // Check if order is delivered
  // const isDelivered = data.status === "Delivered";
  // const isRefundable =
  //   isDelivered && data.paymentInfo?.type !== "Cash On Delivery";
  
  // for just testing
  const isDelivered = data.status === "Delivered";
  const isRefundable = isDelivered ? true : false;
  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] font-semibold">Order Details</h1>
        </div>
        <Link to="/profile">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Back to Profile
          </div>
        </Link>
      </div>

      {/* Order Meta Info */}
      <div className="w-full flex flex-wrap items-center justify-between pt-6 gap-2">
        <h5 className="text-[#00000084]">
          Order ID:{" "}
          <span className="font-semibold text-gray-800">
            #{data._id?.slice(0, 10)}
          </span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on:{" "}
          <span className="font-semibold text-gray-800">
            {data.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
        </h5>
        <h5 className="text-[#00000084]">
          Status:{" "}
          <span
            className={`font-semibold ${
              data.status === "Delivered"
                ? "text-green-600"
                : data.status === "Processing refund" ||
                    data.status === "Refund Success"
                  ? "text-orange-600"
                  : "text-yellow-600"
            }`}
          >
            {data.status}
          </span>
        </h5>
      </div>

      <br />

      {/* Order Items */}
      <div className="w-full">
        <h4 className="text-[18px] font-[600] mb-4">
          Order Items ({totalQty} items)
        </h4>
        {data.cart?.map((item, index) => (
          <div
            className="w-full flex items-center justify-between mb-4 border-b pb-4"
            key={index}
          >
            <div className="flex items-center flex-1">
              <img
                src={`${backend_url}${item.images?.[0]?.url}`}
                alt={item.name}
                className="w-[80px] h-[80px] object-cover rounded-md"
              />
              <div className="flex-1 ml-3">
                <h5 className="text-[16px] font-medium line-clamp-2">
                  {item.name}
                </h5>
                <h5 className="text-[16px] text-[#00000091]">
                  US${item.discountPrice || item.price} × {item.qty || 1}
                </h5>
              </div>
            </div>

            {/* Review Button */}
            {isDelivered && !item.isReviewed && (
              <button
                className={`${styles.button} !rounded-[4px] !h-[40px] text-white text-sm px-4 flex-shrink-0 ml-2`}
                onClick={() => {
                  setSelectedItem(item);
                  setOpen(true);
                }}
              >
                Write Review
              </button>
            )}
            {isDelivered && item.isReviewed && (
              <span className="text-green-600 text-sm font-medium flex-shrink-0 ml-2">
                Reviewed
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="border-t w-full text-right pt-3">
        <h5 className="text-[18px] font-semibold">
          Total Price:{" "}
          <span className="text-[#e94560]">US${data.totalPrice}</span>
        </h5>
      </div>

      <br />

      {/* Shipping & Payment Info */}
      <div className="w-full 800px:flex items-start gap-8">
        <div className="w-full 800px:w-[60%]">
          <h4 className="text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="text-[18px] mt-1">
            {data.shippingAddress?.address1 || ""}{" "}
            {data.shippingAddress?.address2 || ""}
          </h4>
          <h4 className="text-[18px]">{data.shippingAddress?.city || ""}</h4>
          <h4 className="text-[18px]">{data.shippingAddress?.country || ""}</h4>
          <h4 className="text-[18px] font-medium text-gray-700">
            📞 {safeUser.phoneNumber}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%] mt-4 800px:mt-0">
          <h4 className="text-[20px] font-[600]">Payment Info:</h4>
          <h4 className="text-[18px]">
            Type:{" "}
            <span className="font-medium">
              {data.paymentInfo?.type || "N/A"}
            </span>
          </h4>
          <h4 className="text-[18px]">
            Status:{" "}
            <span
              className={`font-medium ${
                data.paymentInfo?.status === "Succeeded" ||
                data.paymentInfo?.status === "succeeded"
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {data.paymentInfo?.status || "Not Paid"}
            </span>
          </h4>

          {/* Refund Button */}
          {isRefundable && data.status !== "Refund Success" && (
            <button
              className={`${styles.button} !bg-[#e94560] text-white mt-3 !rounded-[4px] !h-[40px] px-6 ${
                isSubmitting ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={refundHandler}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Make Refund"}
            </button>
          )}
          {data.status === "Refund Success" && (
            <p className="text-green-600 font-semibold mt-3">
              Refund Successful
            </p>
          )}
        </div>
      </div>

      <br />
      <Link to={`/inbox?conversation=885hfg484873840ijfuuer`}>
        <div className={`${styles.button} text-white`}>Send Message</div>
      </Link>

      {/* ============================================= */}
      {/* REVIEW MODAL */}
      {/* ============================================= */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#00000080] z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[50%] max-h-[90vh] overflow-y-auto bg-white shadow-xl rounded-lg p-6">
            {/* Header */}
            <div className="w-full flex justify-between items-center border-b pb-3">
              <h2 className="text-[24px] font-semibold text-gray-800">
                Write a Review
              </h2>
              <RxCross1
                size={25}
                onClick={() => {
                  setOpen(false);
                  setSelectedItem(null);
                  setComment("");
                  setRating(1);
                }}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              />
            </div>

            {/* Product Preview */}
            <div className="flex items-center mt-4 p-3 bg-gray-50 rounded-lg">
              <img
                src={`${backend_url}${selectedItem?.images?.[0]?.url}`}
                alt={selectedItem?.name}
                className="w-[80px] h-[80px] object-cover rounded-md"
              />
              <div className="ml-3 flex-1">
                <h4 className="text-[16px] font-medium line-clamp-2">
                  {selectedItem?.name || "Product"}
                </h4>
                <h4 className="text-[16px] text-[#00000091]">
                  US${selectedItem?.discountPrice || selectedItem?.price} ×{" "}
                  {selectedItem?.qty || 1}
                </h4>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-4">
              <h5 className="text-[18px] font-medium">
                Rating <span className="text-red-500">*</span>
              </h5>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="mr-1 cursor-pointer transition-transform hover:scale-110"
                      color="#f6ba00"
                      size={30}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      key={i}
                      className="mr-1 cursor-pointer transition-transform hover:scale-110"
                      color="#f6ba00"
                      size={30}
                      onClick={() => setRating(i)}
                    />
                  ),
                )}
                <span className="ml-3 text-sm text-gray-500">
                  {rating > 0 ? `${rating} / 5` : "Select rating"}
                </span>
              </div>
            </div>

            {/* Comment */}
            <div className="mt-4">
              <label className="block text-[18px] font-medium">
                Comment{" "}
                <span className="text-gray-400 text-sm font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full mt-2 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#3957db] focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              className={`${styles.button} text-white mt-4 !rounded-lg !h-[50px] text-[18px] font-semibold ${
                isSubmitting || rating < 1
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              onClick={reviewHandler}
              disabled={isSubmitting || rating < 1}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserOrderDetails;
