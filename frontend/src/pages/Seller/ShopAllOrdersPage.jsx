import React from "react";
import SellerDashboardSideBar from "../../components/Seller/SellerDashboardSideBar.jsx";
import ShopAllOrders from "../../components/Seller/ShopAllOrders.jsx";

const ShopOrdersPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <ShopAllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopOrdersPage;
