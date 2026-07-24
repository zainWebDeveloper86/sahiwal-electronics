import React from "react";
import AdminSideBar from "../../components/Admin/AdminSideBar.jsx";
import AdminAllProducts from "../../components/Admin/AdminAllProducts.jsx";

const AdminAllProductspage = () => {
  return (
    <div>
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
          </div>
          <AdminAllProducts />
        </div>
      </div>
    </div>
  );
};

export default AdminAllProductspage;
