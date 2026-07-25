import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const SellerDashboardSideBar = ({ active }) => {
  const items = [
    { id: 1, icon: RxDashboard, label: "Dashboard", to: "/dashboard" },
    { id: 2, icon: FiShoppingBag, label: "All Orders", to: "/dashboard-all-orders" },
    { id: 3, icon: FiPackage, label: "All Products", to: "/dashboard-all-products" },
    { id: 4, icon: AiOutlineFolderAdd, label: "Create Product", to: "/dashboard-create-product" },
    { id: 5, icon: MdOutlineLocalOffer, label: "All Events", to: "/dashboard-all-events" },
    { id: 6, icon: VscNewFile, label: "Create Event", to: "/dashboard-create-event" },
    { id: 7, icon: CiMoneyBill, label: "Withdraw Money", to: "/dashboard-withdraw-money" },
    { id: 8, icon: BiMessageSquareDetail, label: "Shop Inbox", to: "/dashboard-messages" },
    { id: 9, icon: AiOutlineGift, label: "Discount Codes", to: "/dashboard-all-coupouns" },
    { id: 10, icon: HiOutlineReceiptRefund, label: "Refunds", to: "/dashboard-all-refunds" },
    { id: 11, icon: CiSettings, label: "Settings", to: "/settings" },
  ];

  return (
    <div className="w-full h-[90vh] bg-white border-r border-divider overflow-y-scroll sticky top-0 left-0 z-10">
      {items.map(({ id, icon: Icon, label, to }) => (
        <div className="w-full flex items-center p-4" key={id}>
          <Link to={to} className="w-full flex items-center">
            <Icon size={26} className={active === id ? "text-voltage" : "text-ink/50"} />
            <h5
              className={`hidden 800px:block pl-3 text-[15px] font-body font-[500] ${
                active === id ? "text-voltage" : "text-ink/60"
              }`}
            >
              {label}
            </h5>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SellerDashboardSideBar;