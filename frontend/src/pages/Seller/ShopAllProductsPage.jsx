import React from 'react'
import SellerDashboardSideBar from '../../components/Seller/SellerDashboardSideBar.jsx'
import ShopAllProducts from '../../components/Seller/ShopAllProducts.jsx'

const ShopAllProductsPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={3} />
        </div>
        <div className="w-full justify-center flex">
          <ShopAllProducts />
        </div>
      </div>
    </div>
  )
}

export default ShopAllProductsPage