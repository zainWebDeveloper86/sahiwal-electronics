import React from 'react'
import AdminSideBar from '../../components/Admin/AdminSideBar.jsx';
import AdminAllEvents from '../../components/Admin/AdminAllEvents.jsx';

const AdminAllEventspage = () => {
  return (
    <div>
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={6} />
          </div>
          <AdminAllEvents />
        </div>
      </div>
    </div>
  );
}

export default AdminAllEventspage