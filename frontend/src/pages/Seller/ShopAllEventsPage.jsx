import React from "react";
import SellerDashboardSideBar from "../../components/Seller/SellerDashboardSideBar.jsx";
import ShopAllEvents from "../../components/Seller/ShopAllEvents.jsx";

const ShopAllEventsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={5} />
        </div>
        <div className="w-full justify-center flex">
          <ShopAllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEventsPage;
