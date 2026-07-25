import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { backend_url } from "../../server.js";

const SellerDashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[70px] bg-white border-b border-divider sticky top-0 left-0 z-30 flex items-center justify-between px-6">
      <Link to="/">
        <span className="font-display font-[700] text-[20px] text-ink">
          Sahiwal <span className="text-voltage">Electronics</span>
        </span>
      </Link>
      <div className="flex items-center">
        <Link to="/dashboard-all-coupouns" className="800px:block hidden">
          <AiOutlineGift className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" size={26} />
        </Link>
        <Link to="/dashboard-all-events" className="800px:block hidden">
          <MdOutlineLocalOffer className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" size={26} />
        </Link>
        <Link to="/dashboard-all-products" className="800px:block hidden">
          <FiShoppingBag className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" size={26} />
        </Link>
        <Link to="/dashboard-all-orders" className="800px:block hidden">
          <FiPackage className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" size={26} />
        </Link>
        <Link to="/dashboard-messages" className="800px:block hidden">
          <BiMessageSquareDetail className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" size={26} />
        </Link>
        <Link to={`/shop/${seller?._id}`}>
          <img
            src={`${backend_url}${seller?.avatar?.url}`}
            alt=""
            className="w-[42px] h-[42px] rounded-full object-cover border-2 border-divider ml-2"
          />
        </Link>
      </div>
    </div>
  );
};

export default SellerDashboardHeader;
