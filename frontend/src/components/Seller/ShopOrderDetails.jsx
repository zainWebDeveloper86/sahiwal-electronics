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

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllOrdersOfShop(seller._id));
    }
  }, [dispatch, seller?._id]);

  const data = orders?.find((item) => item._id === id);

  useEffect(() => {
    if (data?.status) {
      setStatus(data.status);
    }
  }, [data?.status]);

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

  const statusColor = {
    Delivered: "text-stock",
    "Refund Success": "text-stock",
    "Processing refund": "text-copper",
    Processing: "text-copper",
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} className="text-copper" />
          <h1 className="pl-2 text-[25px] font-display font-semibold text-ink">
            Order Details
          </h1>
        </div>
        <Link to="/dashboard-all-orders">
          <div className="bg-surface border border-divider hover:bg-divider transition-colors px-4 py-2 rounded-md font-body font-medium text-ink">
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex flex-wrap items-center justify-between pt-6 gap-2">
        <h5 className="text-ink/60 font-body">
          Order ID:{" "}
          <span className="font-semibold text-ink">
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
          <span className={`font-semibold ${statusColor[data.status] || "text-ink"}`}>
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
            className="w-full flex items-center mb-4 border-b border-divider pb-4"
            key={index}
          >
            <img
              src={`${backend_url}${item.images?.[0]?.url}`}
              alt={item.name}
              className="w-[80px] h-[80px] object-cover rounded-md border border-divider bg-surface"
            />
            <div className="flex-1 ml-3">
              <h5 className="text-[16px] font-body font-medium text-ink line-clamp-2">
                {item.name}
              </h5>
              <h5 className="text-[16px] text-ink/60 font-body">
                US${item.discountPrice || item.price} × {item.qty || 1}
              </h5>
            </div>
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
            📞 {data.user?.phoneNumber || "N/A"}
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
        </div>
      </div>

      <br />

      <div className="w-full">
        <h4 className="text-[20px] font-display font-semibold text-ink">Update Order Status:</h4>
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[220px] border border-divider h-[40px] rounded-md px-3 focus:outline-none focus:ring-2 focus:ring-voltage font-body text-ink bg-white"
          >
            {statusOptions.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>

          <div
            className={`${styles.button} !h-[45px] !rounded-md cursor-pointer ${
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
