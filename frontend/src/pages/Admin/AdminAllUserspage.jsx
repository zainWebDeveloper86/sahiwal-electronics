import React from 'react'
import AdminSideBar from '../../components/Admin/AdminSideBar.jsx';
import AdminAllUsers from '../../components/Admin/AdminAllUsers.jsx';

const AdminAllUserspage = () => {
  return (
    <div>
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={4} />
          </div>
          <AdminAllUsers />
        </div>
      </div>
    </div>
  );
}

export default AdminAllUserspage