import React from "react";
import ShopWithDrawMoney from "../../components/Seller/ShopWithDrawMoney.jsx";
import SellerDashboardSideBar from "../../components/Seller/SellerDashboardSideBar.jsx";

const ShopWithDrawMoneyPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={7} />
        </div>
        <div className="w-full justify-center flex">
          <ShopWithDrawMoney />
        </div>
      </div>
    </div>
  );
};

export default ShopWithDrawMoneyPage;
