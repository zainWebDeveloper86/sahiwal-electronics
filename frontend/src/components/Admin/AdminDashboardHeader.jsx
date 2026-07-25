import React from "react";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../server.js";
import { HiOutlineUserGroup } from "react-icons/hi";
import { GrWorkshop } from "react-icons/gr";

const AdminDashboardHeader = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="w-full h-[70px] bg-white border-b border-divider sticky top-0 left-0 z-30 flex items-center justify-between px-6">
      <div>
        <Link to="/">
          <span className="font-display font-[700] text-[22px] text-ink">
            Sahiwal <span className="text-voltage">Electronics</span>
          </span>
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/admin/users" className="800px:block hidden">
            <HiOutlineUserGroup size={26} className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" />
          </Link>
          <Link to="/admin/events" className="800px:block hidden">
            <MdOutlineLocalOffer size={26} className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" />
          </Link>
          <Link to="/admin/products" className="800px:block hidden">
            <FiShoppingBag size={26} className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" />
          </Link>
          <Link to="/admin/orders" className="800px:block hidden">
            <FiPackage size={26} className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" />
          </Link>
          <Link to="/admin/sellers" className="800px:block hidden">
            <GrWorkshop size={26} className="mx-4 cursor-pointer text-ink/50 hover:text-voltage transition-colors" />
          </Link>
          <Link to="/admin/settings">
            <img
              src={`${backend_url}${user?.avatar?.url}`}
              alt="Admin"
              className="w-[42px] h-[42px] rounded-full object-cover border-2 border-divider hover:border-voltage transition-colors"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${user?.name || "A"}&background=2F5FF6&color=fff`;
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;