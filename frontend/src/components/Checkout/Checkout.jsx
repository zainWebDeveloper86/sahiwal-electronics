import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { axiosServerInstance } from "../../server.js";
import styles from "../../styles/styles.js";
import ShippingInfo from "./ShippingInfo.jsx";
import CartData from "./CartData.jsx";

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice =
    cart?.reduce(
      (acc, item) =>
        acc + (item.qty || 1) * (item.discountPrice || item.originalPrice || 0),
      0,
    ) || 0;

  const shipping = subTotalPrice * 0.1;

  const handleCouponSubmit = async (e) => {
    e.preventDefault();

    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code!");
      return;
    }

    try {
      const { data } = await axiosServerInstance.get(
        `/coupon/get-coupon-value/${couponCode}`,
      );

      if (!data.couponCode) {
        toast.error("Coupon code doesn't exist!");
        setCouponCode("");
        return;
      }

      const shopId = data.couponCode.shopId;
      const couponValue = data.couponCode.value;

      const eligibleItems = cart.filter((item) => item.shopId === shopId);

      if (eligibleItems.length === 0) {
        toast.error("Coupon code is not valid for items in your cart!");
        setCouponCode("");
        return;
      }

      const eligiblePrice = eligibleItems.reduce(
        (acc, item) =>
          acc +
          (item.qty || 1) * (item.discountPrice || item.originalPrice || 0),
        0,
      );

      const discount = (eligiblePrice * couponValue) / 100;
      setDiscountPrice(discount);
      setCouponCodeData(data.couponCode);
      setCouponCode("");
      toast.success(`Coupon applied! You saved $${discount.toFixed(2)}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  };

  const totalPrice = (subTotalPrice + shipping - discountPrice).toFixed(2);

  const paymentSubmit = () => {
    if (!address1 || !zipCode || !country || !city) {
      toast.error("Please fill all required delivery address fields!");
      return;
    }

    const shippingAddress = { address1, address2, zipCode, country, city };
    const orderData = {
      cart,
      totalPrice,
      subTotalPrice,
      shipping,
      discountPrice,
      shippingAddress,
      user,
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/payment");
  };

  return (
    <div className="w-full flex flex-col items-center py-8 bg-surface min-h-screen">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex gap-8">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>

        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleCouponSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPrice}
            couponCodeData={couponCodeData}
          />
        </div>
      </div>

      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10 cursor-pointer`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white font-body font-medium">Go to Payment</h5>
      </div>
    </div>
  );
};

export default Checkout;