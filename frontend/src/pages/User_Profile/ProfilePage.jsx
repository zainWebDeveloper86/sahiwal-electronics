import React, { useState } from "react";
import styles from "../../styles/styles.js";
import Loader from "../../components/Common/Loader.jsx";
import { useSelector } from "react-redux";
import ProfileSidebar from "../../components/User_Profile/ProfileSideBar.jsx";
import ProfileContent from "../../components/User_Profile/ProfileContent.jsx";

const ProfilePage = () => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className={`${styles.section} bg-surface py-10 min-h-screen`}>
          <div className="w-full flex gap-6">
            <div className="w-[50px] 800px:w-[280px] 800px:sticky 800px:top-10 self-start">
              <ProfileSidebar active={active} setActive={setActive} />
            </div>
            <div className="w-full 800px:flex-1">
              <ProfileContent active={active} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;