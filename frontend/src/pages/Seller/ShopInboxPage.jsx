import React from "react";
import SellerDashboardSideBar from "../../components/Seller/SellerDashboardSideBar.jsx";
import ShopInbox from "../../components/Seller/conversation/ShopInbox.jsx";

const ShopInboxPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={8} />
        </div>
        <div className="w-full justify-center flex">
          <ShopInbox />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;
