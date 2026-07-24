import React from 'react'
import AdminSideBar from '../../components/Admin/AdminSideBar.jsx';
import AdminSettings from '../../components/Admin/AdminSettings.jsx';

const AdminSettingsPage = () => {
  return (
    <div>
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={8} />
          </div>
          <AdminSettings />
        </div>
      </div>
    </div>
  );
}

export default AdminSettingsPage