import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "../../styles/styles.js";
import { axiosServerInstance } from "../../server.js";
import Loader from "../Common/Loader.jsx";
import CreateCouponModal from "../Coupon/CreateCouponModal.jsx";
import CouponTable from "../Coupon/CouponTable.jsx";

const ShopAllCoupouns = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const { seller } = useSelector((state) => state.seller);

  const fetchCoupons = async () => {
    setIsLoading(true);
    try {
      const { data } = await axiosServerInstance.get(`/coupon/get-all-coupon/${seller._id}`);
      setCoupons(data.couponCodes);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch coupons");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (seller?._id) {
      fetchCoupons();
    }
  }, [seller]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    
    try {
      await axiosServerInstance.delete(`/coupon/delete-coupon/${id}`);
      toast.success("Coupon code deleted successfully!");
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete coupon");
    }
  };

  const handleCreateCoupon = async (formData) => {
    try {
      const payload = {
        ...formData,
        shopId: seller._id,
      };
      await axiosServerInstance.post(`/coupon/create-coupon-code`, payload);
      toast.success("Coupon code created successfully!");
      setOpen(false);
      fetchCoupons();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create coupon");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white border border-divider rounded-lg">
          <div className="w-full flex justify-end p-4 border-b border-divider">
            <div
              className={`${styles.button} !w-max !h-[42px] px-5 !rounded-md cursor-pointer`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white font-body font-[500]">Create Coupon Code</span>
            </div>
          </div>

          <CouponTable coupons={coupons} onDelete={handleDelete} />

          <CreateCouponModal
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={handleCreateCoupon}
          />
        </div>
      )}
    </>
  );
};

export default ShopAllCoupouns;