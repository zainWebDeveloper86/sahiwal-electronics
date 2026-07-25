import React from "react";
import ProfileInfo from "./ProfileInfo.jsx";
import AllOrders from "./AllOrders.jsx";
import AllRefundOrders from "./AllRefundOrders.jsx";
import TrackOrder from "./TrackOrder.jsx";
import ChangePassword from "./ChangePassword.jsx";
import Address from "./Address.jsx";
import UserInbox from "./conversation/UserInbox.jsx";

const ProfileContent = ({ active }) => {
  return (
    <div className="w-full bg-white border border-divider rounded-lg p-6 min-h-[60vh]">
      {active === 1 && <ProfileInfo />}
      {active === 2 && <AllOrders />}
      {active === 3 && <AllRefundOrders />}
      {active === 4 && <UserInbox />}
      {active === 5 && <TrackOrder />}
      {active === 6 && <ChangePassword />}
      {active === 7 && <Address />}
    </div>
  );
};

export default ProfileContent;