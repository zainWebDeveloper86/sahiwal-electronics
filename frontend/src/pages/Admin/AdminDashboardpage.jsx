import React from "react";
import AdminDashboardMain from "../../components/Admin/AdminDashboardMain.jsx";
import AdminSideBar from "../../components/Admin/AdminSideBar.jsx";

const AdminDashboardpage = () => {
  return (
    <div>
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={1} />
          </div>
          <AdminDashboardMain />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardpage;
