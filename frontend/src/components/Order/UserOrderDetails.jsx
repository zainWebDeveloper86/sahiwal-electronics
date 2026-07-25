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

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  const data = orders?.find((item) => item._id === id);

  const safeUser = {
    name: user?.name || "Guest",
    email: user?.email || "No email provided",
    phoneNumber: user?.phoneNumber || "N/A",
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-copper font-body text-lg">Failed to load order: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-ink/50 font-body text-lg">Order not found!</p>
      </div>
    );
  }

  const totalQty =
    data.cart?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0;

  const isDelivered = data.status === "Delivered";
  const isRefundable = isDelivered ? true : false;

  const statusColor = {
    Delivered: "text-stock",
    "Processing refund": "text-copper",
    "Refund Success": "text-stock",
  }[data.status] || "text-copper";

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} className="text-copper" />
          <h1 className="pl-2 text-[25px] font-display font-semibold text-ink">
            Order Details
          </h1>
        </div>
        <Link to="/profile">
          <div className="bg-surface border border-divider hover:bg-divider transition-colors px-4 py-2 rounded-md font-body font-medium text-ink">
            Back to Profile
          </div>
        </Link>
      </div>

      <div className="w-full flex flex-wrap items-center justify-between pt-6 gap-2">
        <h5 className="text-ink/60 font-body">
          Order ID:{" "}
          <span className="font-semibold text-ink font-mono">
            #{data._id?.slice(0, 10)}
          </span>
        </h5>
        <h5 className="text-ink/60 font-body">
          Placed on:{" "}
          <span className="font-semibold text-ink">
            {data.createdAt
              ? new Date(data.createdAt).toLocaleDateString()
              : "N/A"}
          </span>
        </h5>
        <h5 className="text-ink/60 font-body">
          Status:{" "}
          <span className={`font-semibold ${statusColor}`}>
            {data.status}
          </span>
        </h5>
      </div>

      <br />

      <div className="w-full">
        <h4 className="text-[18px] font-display font-semibold text-ink mb-4">
          Order Items ({totalQty} items)
        </h4>
        {data.cart?.map((item, index) => (
          <div
            className="w-full flex items-center justify-between mb-4 border-b border-divider pb-4"
            key={index}
          >
            <div className="flex items-center flex-1">
              <img
                src={`${backend_url}${item.images?.[0]?.url}`}
                alt={item.name}
                className="w-[80px] h-[80px] object-cover rounded-md border border-divider bg-surface"
              />
              <div className="flex-1 ml-3">
                <h5 className="text-[16px] font-body font-medium text-ink line-clamp-2">
                  {item.name}
                </h5>
                <h5 className="text-[16px] font-body text-ink/60">
                  US${item.discountPrice || item.price} × {item.qty || 1}
                </h5>
              </div>
            </div>

            {isDelivered && !item.isReviewed && (
              <button
                className={`${styles.button} !rounded-md !h-[40px] text-sm px-4 flex-shrink-0 ml-2`}
                onClick={() => {
                  setSelectedItem(item);
                  setOpen(true);
                }}
              >
                Write Review
              </button>
            )}
            {isDelivered && item.isReviewed && (
              <span className="text-stock font-body font-medium flex-shrink-0 ml-2">
                Reviewed
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-divider w-full text-right pt-3">
        <h5 className="text-[18px] font-display font-semibold text-ink">
          Total Price:{" "}
          <span className="text-copper">US${data.totalPrice}</span>
        </h5>
      </div>

      <br />

      <div className="w-full 800px:flex items-start gap-8">
        <div className="w-full 800px:w-[60%]">
          <h4 className="text-[20px] font-display font-semibold text-ink">Shipping Address:</h4>
          <h4 className="text-[18px] font-body text-ink/80 mt-1">
            {data.shippingAddress?.address1 || ""}{" "}
            {data.shippingAddress?.address2 || ""}
          </h4>
          <h4 className="text-[18px] font-body text-ink/80">
            {data.shippingAddress?.city || ""}
          </h4>
          <h4 className="text-[18px] font-body text-ink/80">
            {data.shippingAddress?.country || ""}
          </h4>
          <h4 className="text-[18px] font-body font-medium text-ink">
            📞 {safeUser.phoneNumber}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%] mt-4 800px:mt-0">
          <h4 className="text-[20px] font-display font-semibold text-ink">Payment Info:</h4>
          <h4 className="text-[18px] font-body text-ink/80">
            Type:{" "}
            <span className="font-medium text-ink">
              {data.paymentInfo?.type || "N/A"}
            </span>
          </h4>
          <h4 className="text-[18px] font-body text-ink/80">
            Status:{" "}
            <span
              className={`font-medium ${
                data.paymentInfo?.status === "Succeeded" ||
                data.paymentInfo?.status === "succeeded"
                  ? "text-stock"
                  : "text-copper"
              }`}
            >
              {data.paymentInfo?.status || "Not Paid"}
            </span>
          </h4>

          {isRefundable && data.status !== "Refund Success" && (
            <button
              className={`${styles.button} !bg-copper !rounded-md !h-[40px] px-6 mt-3 ${
                isSubmitting ? "opacity-50 pointer-events-none" : ""
              }`}
              onClick={refundHandler}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Make Refund"}
            </button>
          )}
          {data.status === "Refund Success" && (
            <p className="text-stock font-semibold font-body mt-3">
              Refund Successful
            </p>
          )}
        </div>
      </div>

      <br />
      <Link to={`/inbox?conversation=885hfg484873840ijfuuer`}>
        <div className={`${styles.button} !w-max px-6`}>Send Message</div>
      </Link>

      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-ink/40 z-50 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[50%] max-h-[90vh] overflow-y-auto bg-white border border-divider rounded-lg p-6 shadow-sm">
            <div className="w-full flex justify-between items-center border-b border-divider pb-3">
              <h2 className="text-[24px] font-display font-semibold text-ink">
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
                className="cursor-pointer text-ink/50 hover:text-ink transition-colors"
              />
            </div>

            <div className="flex items-center mt-4 p-3 bg-surface rounded-lg border border-divider">
              <img
                src={`${backend_url}${selectedItem?.images?.[0]?.url}`}
                alt={selectedItem?.name}
                className="w-[80px] h-[80px] object-cover rounded-md"
              />
              <div className="ml-3 flex-1">
                <h4 className="text-[16px] font-body font-medium text-ink line-clamp-2">
                  {selectedItem?.name || "Product"}
                </h4>
                <h4 className="text-[16px] font-body text-ink/60">
                  US${selectedItem?.discountPrice || selectedItem?.price} ×{" "}
                  {selectedItem?.qty || 1}
                </h4>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-[18px] font-body font-medium text-ink">
                Rating <span className="text-copper">*</span>
              </h5>
              <div className="flex items-center mt-2">
                {[1, 2, 3, 4, 5].map((i) =>
                  rating >= i ? (
                    <AiFillStar
                      key={i}
                      className="mr-1 cursor-pointer transition-transform hover:scale-110"
                      color="#F5A623"
                      size={30}
                      onClick={() => setRating(i)}
                    />
                  ) : (
                    <AiOutlineStar
                      key={i}
                      className="mr-1 cursor-pointer transition-transform hover:scale-110"
                      color="#F5A623"
                      size={30}
                      onClick={() => setRating(i)}
                    />
                  ),
                )}
                <span className="ml-3 text-sm font-body text-ink/50">
                  {rating > 0 ? `${rating} / 5` : "Select rating"}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-[18px] font-body font-medium text-ink">
                Comment{" "}
                <span className="text-ink/40 text-sm font-normal">
                  (optional)
                </span>
              </label>
              <textarea
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full mt-2 border border-divider rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-voltage focus:border-transparent font-body resize-none"
              />
            </div>

            <button
              className={`${styles.button} mt-4 !rounded-lg !h-[50px] text-[18px] font-semibold ${
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