import React from "react";
import SellerDashboardSideBar from "../../components/Seller/SellerDashboardSideBar.jsx";
import ShopCreateEvent from "../../components/Seller/ShopCreateEvent.jsx";

const ShopCreateEventPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <ShopCreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEventPage;
