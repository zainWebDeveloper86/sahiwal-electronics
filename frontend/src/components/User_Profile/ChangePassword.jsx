import React, { useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { axiosServerInstance } from "../../server.js";
import styles from "../../styles/styles.js";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axiosServerInstance.put("/user/update-user-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      toast.success(data?.message || "Password updated!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form onSubmit={passwordChangeHandler} className="flex flex-col items-center">
          <div className="relative w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type={visible ? "text" : "password"}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {visible ? (
              <AiOutlineEye
                className="absolute right-8 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-8 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(true)}
              />
            )}
          </div>
          <div className="relative w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type={visible ? "text" : "password"}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {visible ? (
              <AiOutlineEye
                className="absolute right-8 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-8 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(true)}
              />
            )}
          </div>
          <div className="relative w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type={visible ? "text" : "password"}
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {visible ? (
              <AiOutlineEye
                className="absolute right-8 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-8 top-9 cursor-pointer"
                size={25}
                onClick={() => setVisible(true)}
              />
            )}
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-8">
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] hover:bg-[#3a24db] hover:text-white rounded-[3px] cursor-pointer transition-all`}
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;