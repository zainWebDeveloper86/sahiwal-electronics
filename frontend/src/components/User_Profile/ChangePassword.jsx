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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `${styles.input} !w-[95%]`;
  const labelClass = "block pb-2 font-body font-medium text-ink";

  return (
    <div className="w-full px-2">
      <h1 className="text-[25px] font-display font-semibold text-ink text-center pb-4 border-b border-divider">
        Change Password
      </h1>
      <div className="w-full mt-6">
        <form onSubmit={passwordChangeHandler} className="flex flex-col items-center">
          <div className="relative w-[100%] 800px:w-[50%] mt-2">
            <label className={labelClass}>Enter your old password</label>
            <input
              type={visible ? "text" : "password"}
              className={inputClass}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="relative w-[100%] 800px:w-[50%] mt-4">
            <label className={labelClass}>Enter your new password</label>
            <input
              type={visible ? "text" : "password"}
              className={inputClass}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="relative w-[100%] 800px:w-[50%] mt-4">
            <label className={labelClass}>Enter your confirm password</label>
            <input
              type={visible ? "text" : "password"}
              className={inputClass}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {visible ? (
              <AiOutlineEye
                className="absolute right-6 top-9 cursor-pointer text-ink/50 hover:text-ink transition-colors"
                size={22}
                onClick={() => setVisible(false)}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="absolute right-6 top-9 cursor-pointer text-ink/50 hover:text-ink transition-colors"
                size={22}
                onClick={() => setVisible(true)}
              />
            )}
          </div>
          <div className="w-[100%] 800px:w-[50%] mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.button} !w-[95%] !rounded-md ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;