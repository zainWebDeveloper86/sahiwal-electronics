import React from "react";
import SellerDashboardSideBar from "../../components/Seller/SellerDashboardSideBar.jsx";
import SellerDashboardHero from "../../components/Seller/SellerDashboardHero.jsx";

const SellerDashboardPage = () => {
  return (
    <div>
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={1} />
        </div>
        <SellerDashboardHero />
      </div>
    </div>
  );
};

export default SellerDashboardPage;