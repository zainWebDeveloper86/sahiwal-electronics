import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlinePassword,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosServerInstance } from "../../server.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    axiosServerInstance
      .post("/user/logout")
      .then((res) => {
        toast.success(res.data.message);
        dispatch({ type: "LogoutUser" });
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  const menuItems = [
    { id: 1, icon: RxPerson, label: "Profile" },
    { id: 2, icon: HiOutlineShoppingBag, label: "Orders" },
    { id: 3, icon: HiOutlineReceiptRefund, label: "Refunds" },
    { id: 4, icon: AiOutlineMessage, label: "Inbox", action: () => navigate("/inbox") },
    { id: 5, icon: MdOutlineTrackChanges, label: "Track Order" },
    { id: 6, icon: RiLockPasswordLine, label: "Change Password" },
    { id: 7, icon: TbAddressBook, label: "Address" },
  ];

  return (
    <div className="w-full bg-white border border-divider rounded-lg p-4 pt-6">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center cursor-pointer w-full mb-5 group ${
            active === item.id ? "text-voltage" : "text-ink/60"
          }`}
          onClick={() => {
            setActive(item.id);
            if (item.action) item.action();
          }}
        >
          <item.icon
            size={20}
            className={active === item.id ? "text-voltage" : "text-ink/50 group-hover:text-ink"}
          />
          <span
            className={`pl-3 font-body font-medium 800px:block hidden ${
              active === item.id ? "text-voltage" : "text-ink/60 group-hover:text-ink"
            } transition-colors`}
          >
            {item.label}
          </span>
        </div>
      ))}

      <div
        className="flex items-center cursor-pointer w-full mt-5 pt-4 border-t border-divider group"
        onClick={logoutHandler}
      >
        <AiOutlineLogin size={20} className="text-copper" />
        <span className="pl-3 font-body font-medium text-copper 800px:block hidden">
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;