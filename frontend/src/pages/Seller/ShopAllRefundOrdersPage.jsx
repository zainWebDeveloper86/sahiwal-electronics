import React from "react";
import SellerDashboardSideBar from "../../components/Seller/SellerDashboardSideBar.jsx";
import ShopAllRefundOrders from "../../components/Seller/ShopAllRefundOrders.jsx";

const ShopAllRefundOrdersPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <ShopAllRefundOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefundOrdersPage;
