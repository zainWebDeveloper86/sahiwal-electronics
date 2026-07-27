import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { MdOutlineLocalOffer } from "react-icons/md";
import { AiOutlineLogin } from "react-icons/ai";
import { axiosServerInstance } from "../../server.js";

const AdminSideBar = ({ active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await axiosServerInstance.post("/user/logout", {
        withCredentials: true,
      });
      toast.success("Logout successful!");
      dispatch({ type: "LogoutUser" });
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const menuItems = [
    { id: 1, icon: RxDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { id: 2, icon: FiShoppingBag, label: "All Orders", path: "/admin/orders" },
    { id: 3, icon: GrWorkshop, label: "All Sellers", path: "/admin/sellers" },
    { id: 4, icon: HiOutlineUserGroup, label: "All Users", path: "/admin/users" },
    { id: 5, icon: BsHandbag, label: "All Products", path: "/admin/products" },
    { id: 6, icon: MdOutlineLocalOffer, label: "All Events", path: "/admin/events" },
    { id: 7, icon: CiMoneyBill, label: "Withdraw Request", path: "/admin/withdraw-request" },
    { id: 8, icon: CiSettings, label: "Settings", path: "/admin/settings" },
  ];

  return (
    <div className="w-full h-[90vh] bg-white border-r border-divider overflow-y-scroll sticky top-0 left-0 z-10">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className="w-full flex items-center p-4 hover:bg-surface transition-colors"
        >
          <Link to={item.path} className="w-full flex items-center">
            <item.icon
              size={26}
              className={active === item.id ? "text-voltage" : "text-ink/50"}
            />
            <h5
              className={`hidden 800px:block pl-3 text-[15px] font-body font-medium ${
                active === item.id ? "text-voltage" : "text-ink/60"
              } transition-colors`}
            >
              {item.label}
            </h5>
          </Link>
        </div>
      ))}

      <div
        className="w-full flex items-center p-4 hover:bg-surface transition-colors cursor-pointer border-t border-divider mt-2 pt-3"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={26} className="text-copper" />
        <h5 className="hidden 800px:block pl-3 text-[15px] font-body font-medium text-copper">
          Logout
        </h5>
      </div>
    </div>
  );
};

export default AdminSideBar;