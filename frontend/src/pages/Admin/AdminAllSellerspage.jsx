import React from "react";
import AdminSideBar from "../../components/Admin/AdminSideBar.jsx";
import AdminAllSellers from "../../components/Admin/AdminAllSellers.jsx";

const AdminAllSellerspage = () => {
  return (
    <div>
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={3} />
          </div>
          <AdminAllSellers />
        </div>
      </div>
    </div>
  );
};

export default AdminAllSellerspage;
