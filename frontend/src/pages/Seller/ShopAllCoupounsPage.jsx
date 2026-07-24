import React from 'react'
import ShopAllCoupouns from '../../components/Seller/ShopAllCoupouns.jsx'
import SellerDashboardSideBar from '../../components/Seller/SellerDashboardSideBar.jsx'

const ShopAllCoupounsPage = () => {
  return (
        <div>
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <SellerDashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <ShopAllCoupouns />
        </div>
      </div>
    </div>
  )
}

export default ShopAllCoupounsPage