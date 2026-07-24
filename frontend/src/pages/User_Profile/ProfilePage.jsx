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
        <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
          <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
            <ProfileSidebar active={active} setActive={setActive} />
          </div>
          <ProfileContent active={active} />
        </div>
      )}
    </>
  );
};

export default ProfilePage;
