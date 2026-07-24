import React from "react";
import SellerDashboardSideBar from "../../components/Seller/SellerDashboardSideBar.jsx";
import ShopCreateProduct from "../../components/Seller/ShopCreateProduct.jsx";

const ShopCreateProductPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={4} />
        </div>
        <div className="w-full justify-center flex">
          <ShopCreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProductPage;
