import React from "react";
import SellerDashboardSideBar from "../../components/Seller/SellerDashboardSideBar.jsx";
import SellerSettings from "../../components/Seller/SellerSettings.jsx";

const SellerSettingsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={11} />
        </div>
        <div className="w-full justify-center flex">
          <SellerSettings />
        </div>
      </div>
    </div>
  );
};

export default SellerSettingsPage;
