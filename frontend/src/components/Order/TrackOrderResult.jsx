import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order.js";
import Loader from "../Common/Loader.jsx";
import { toast } from "react-toastify";

const TrackOrderResult = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { orders, loading, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  const data = orders?.find((item) => item._id === id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  if (error) {
    toast.error(error);
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

  const statusMessages = {
    Processing: "Your order is being processed by the shop.",
    "Transferred to delivery partner":
      "Your order has been handed over to the delivery partner.",
    Shipping: "Your order is on the way with our delivery partner.",
    Received:
      "Your order has reached your city. Our delivery man will deliver it soon.",
    "On the way": "Our delivery man is on the way to deliver your order.",
    Delivered: "Your order has been successfully delivered! 🎉",
    "Processing refund": "Your refund request is being processed.",
    "Refund Success": "Your refund has been successfully processed! ✅",
  };

  const statusMessage =
    statusMessages[data.status] || "Your order status is being updated.";

  const statusColors = {
    Processing: "text-copper",
    "Transferred to delivery partner": "text-voltage",
    Shipping: "text-voltage",
    Received: "text-ink/70",
    "On the way": "text-copper",
    Delivered: "text-stock",
    "Processing refund": "text-copper",
    "Refund Success": "text-stock",
  };

  const statusColor = statusColors[data.status] || "text-ink/60";

  const getStatusIcon = (status) => {
    const icons = {
      Processing: "⏳",
      "Transferred to delivery partner": "📦",
      Shipping: "🚚",
      Received: "📍",
      "On the way": "🚴",
      Delivered: "✅",
      "Processing refund": "🔄",
      "Refund Success": "💰",
    };
    return icons[status] || "📋";
  };

  const statusProgress = {
    Processing: 20,
    "Transferred to delivery partner": 35,
    Shipping: 50,
    Received: 75,
    "On the way": 85,
    Delivered: 100,
    "Processing refund": 60,
    "Refund Success": 100,
  };

  const progressPercent = statusProgress[data.status] || 10;

  const isRefundFlow =
    data.status === "Processing refund" || data.status === "Refund Success";

  const progressLabels = isRefundFlow
    ? ["Delivered", "Refund Requested", "Refund Complete"]
    : ["Ordered", "Shipped", "Delivered"];

  const progressBarColor = isRefundFlow ? "bg-copper" : "bg-voltage";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 bg-surface">
      <div className="w-full max-w-2xl bg-white border border-divider rounded-xl p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{getStatusIcon(data.status)}</span>
          <h2 className="text-2xl font-display font-bold text-ink">
            Order #{data._id?.slice(0, 8)}
          </h2>
        </div>

        <div className="mb-6">
          <p className={`text-xl font-medium font-body ${statusColor}`}>{statusMessage}</p>
          <p className="text-sm font-body text-ink/40 mt-2">
            Last updated:{" "}
            {data.updatedAt
              ? new Date(data.updatedAt).toLocaleString()
              : new Date(data.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="border-t border-divider pt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-ink/50 font-body">Order ID:</span>
            <span className="ml-2 font-medium text-ink font-mono">
              #{data._id?.slice(0, 10)}
            </span>
          </div>
          <div>
            <span className="text-ink/50 font-body">Total Price:</span>
            <span className="ml-2 font-medium text-copper font-mono">
              US${data.totalPrice}
            </span>
          </div>
          <div>
            <span className="text-ink/50 font-body">Items:</span>
            <span className="ml-2 font-medium text-ink">
              {data.cart?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0}
            </span>
          </div>
          <div>
            <span className="text-ink/50 font-body">Payment:</span>
            <span className="ml-2 font-medium text-ink">
              {data.paymentInfo?.type || "N/A"}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <div className="w-full bg-divider rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${progressBarColor}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-body text-ink/40 mt-1">
            <span>{progressLabels[0]}</span>
            <span>{progressLabels[1]}</span>
            <span>{progressLabels[2]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderResult;