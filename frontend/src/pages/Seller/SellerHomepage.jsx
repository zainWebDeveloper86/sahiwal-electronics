import React from "react";
import styles from "../../styles/styles.js";
import ShopInfo from "../../components/Seller/ShopInfo.jsx";
import ShopProfileData from "../../components/Seller/ShopProfileData.jsx";

const SellerHomepage = () => {
  return (
    <div className={`${styles.section} bg-surface`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-white rounded-lg border border-divider overflow-y-scroll h-[90vh] sticky top-10 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[72%] rounded-lg">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default SellerHomepage;