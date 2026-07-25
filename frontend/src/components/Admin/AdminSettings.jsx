import React from "react";
import ProfileInfo from "../User_Profile/ProfileInfo.jsx";

const AdminSettings = () => {
  return (
    <div className="w-full p-6">
      <h3 className="text-[22px] font-display font-semibold text-ink pb-4">
        Admin Settings
      </h3>
      <div className="w-full bg-white border border-divider rounded-lg p-6">
        <ProfileInfo />
      </div>
    </div>
  );
};

export default AdminSettings;