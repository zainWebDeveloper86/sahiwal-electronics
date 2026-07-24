import React, { useEffect, useState } from "react";
import styles from "../../styles/styles.js";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order.js";
import { axiosServerInstance, backend_url } from "../../server.js";
import { toast } from "react-toastify";
import Loader from "../Common/Loader.jsx";

const ShopOrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { seller } = useSelector((state) => state.seller);
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [status, setStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  //  Fetch orders only if seller exists
  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  //  Find current order
  const data = orders?.find((item) => item._id === id);

  //  Set initial status when data loads
  useEffect(() => {
    if (data?.status) {
      setStatus(data.status);
    }
  }, [data?.status]);

  //  Order Update Handler
  const orderUpdateHandler = async () => {
    if (!status || status === data?.status) {
      toast.info("No change in status");
      return;
    }

    setIsUpdating(true);
    try {
      await axiosServerInstance.put(`/order/update-order-status/${id}`, {
        status,
      });
      toast.success("Order updated successfully!");
      dispatch(getAllOrdersOfShop(seller._id));
      navigate("/dashboard-all-orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update order");
    } finally {
      setIsUpdating(false);
    }
  };

  //  Refund Order Update Handler
  const refundOrderUpdateHandler = async () => {
    if (!status || status === data?.status) {
      toast.info("No change in status");
      return;
    }

    setIsUpdating(true);
    try {
      await axiosServerInstance.put(`/order/order-refund-success/${id}`, {
        status,
      });
      toast.success("Refund updated successfully!");
      dispatch(getAllOrdersOfShop(seller._id));
      navigate("/dashboard-all-orders");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update refund");
    } finally {
      setIsUpdating(false);
    }
  };

  //  Loading State
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  //  Error State
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500 text-lg">Failed to load order: {error}</p>
      </div>
    );
  }

  //  Order Not Found
  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-500 text-lg">Order not found!</p>
      </div>
    );
  }

  //  Calculate total quantity
  const totalQty =
    data.cart?.reduce((sum, item) => sum + (item.qty || 1), 0) || 0;

  //  Status options based on current status
  const getStatusOptions = (currentStatus) => {
    const allStatuses = [
      "Processing",
      "Transferred to delivery partner",
      "Shipping",
      "Received",
      "On the way",
      "Delivered",
    ];

    const refundStatuses = ["Processing refund", "Refund Success"];

    if (
      currentStatus === "Processing refund" ||
      currentStatus === "Refund Success"
    ) {
      return refundStatuses.slice(refundStatuses.indexOf(currentStatus));
    }

    const index = allStatuses.indexOf(currentStatus);
    return index !== -1 ? allStatuses.slice(index) : allStatuses;
  };

  const statusOptions = getStatusOptions(data.status);

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px] font-semibold">Order Details</h1>
        </div>
        <Link to="/dashboard-all-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
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
              data.status === "Delivered" ? "text-green-600" : "text-yellow-600"
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
            className="w-full flex items-center mb-4 border-b pb-4"
            key={index}
          >
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
            📞 {data.user?.phoneNumber || "N/A"}
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
        </div>
      </div>

      <br />

      {/* Order Status Update */}
      <div className="w-full">
        <h4 className="text-[20px] font-[600]">Update Order Status:</h4>
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[220px] border border-gray-300 h-[40px] rounded-[5px] px-3 focus:outline-none focus:ring-2 focus:ring-[#3957db]"
          >
            {statusOptions.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>

          <div
            className={`${styles.button} !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px] cursor-pointer ${
              isUpdating ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={
              data.status === "Processing refund" ||
              data.status === "Refund Success"
                ? refundOrderUpdateHandler
                : orderUpdateHandler
            }
          >
            {isUpdating ? "Updating..." : "Update Status"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopOrderDetails;
