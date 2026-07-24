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

  // Fetch orders only if user exists
  useEffect(() => {
    if (user?._id) {
      dispatch(getAllOrdersOfUser(user._id));
    }
  }, [dispatch, user?._id]);

  // Find current order
  const data = orders?.find((item) => item._id === id);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  // Handle error state
  if (error) {
    toast.error(error);
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg">Failed to load order: {error}</p>
      </div>
    );
  }

  // Order not found
  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Order not found!</p>
      </div>
    );
  }

  // Status messages mapping
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

  // Status color mapping
  const statusColors = {
    Processing: "text-yellow-600",
    "Transferred to delivery partner": "text-blue-600",
    Shipping: "text-blue-600",
    Received: "text-purple-600",
    "On the way": "text-orange-600",
    Delivered: "text-green-600",
    "Processing refund": "text-orange-600",
    "Refund Success": "text-green-600",
  };

  const statusColor = statusColors[data.status] || "text-gray-600";

  // Helper: get status icon
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

  // Progress % mapping — same object-lookup pattern as statusMessages/statusColors,
  // so "Processing refund" and "Refund Success" are handled explicitly instead
  // of silently falling back to 10%.
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

  // Refund orders follow a different journey than normal delivery, so the
  // bar gets its own color and its own set of labels.
  const isRefundFlow =
    data.status === "Processing refund" || data.status === "Refund Success";

  const progressLabels = isRefundFlow
    ? ["Delivered", "Refund Requested", "Refund Complete"]
    : ["Ordered", "Shipped", "Delivered"];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      {/* Order Info */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{getStatusIcon(data.status)}</span>
          <h2 className="text-2xl font-bold text-gray-800">
            Order #{data._id?.slice(0, 8)}
          </h2>
        </div>

        {/* Status Message */}
        <div className="mb-6">
          <p className={`text-xl font-medium ${statusColor}`}>{statusMessage}</p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated:{" "}
            {data.updatedAt
              ? new Date(data.updatedAt).toLocaleString()
              : new Date(data.createdAt).toLocaleString()}
          </p>
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500">Order ID:</span>
            <span className="ml-2 font-medium text-gray-700">
              #{data._id?.slice(0, 10)}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Total Price:</span>
            <span className="ml-2 font-medium text-gray-700">
              US${data.totalPrice}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Items:</span>
            <span className="ml-2 font-medium text-gray-700">
              {data.cart?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Payment:</span>
            <span className="ml-2 font-medium text-gray-700">
              {data.paymentInfo?.type || "N/A"}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ${
                isRefundFlow ? "bg-orange-500" : "bg-blue-600"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
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
