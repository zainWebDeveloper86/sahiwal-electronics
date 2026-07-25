import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AiOutlineCamera, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { backend_url, axiosServerInstance } from "../../server.js";
import styles from "../../styles/styles.js";
import { loadUser, updateUserInformation } from "../../redux/actions/user.js";

const ProfileInfo = () => {
  const dispatch = useDispatch();
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatar(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axiosServerInstance.put("/user/update-user-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      dispatch(loadUser());
      toast.success("Profile image updated!");
      setAvatar(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
    }
  };

  const inputClass = `${styles.input} !w-[95%]`;
  const labelClass = "block pb-2 font-body font-medium text-ink";

  return (
    <>
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : `${backend_url}${user?.avatar?.url}`
            }
            className="w-[150px] h-[150px] rounded-full object-cover border-4 border-stock"
            alt="Profile"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${user?.name || "U"}&background=2F5FF6&color=fff&size=150`;
            }}
          />
          <div className="w-[35px] h-[35px] bg-surface border border-divider rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px] hover:bg-divider transition-colors">
            <input type="file" id="image" className="hidden" onChange={handleImage} accept=".jpg,.jpeg,.png" />
            <label htmlFor="image" className="cursor-pointer">
              <AiOutlineCamera className="text-ink/60" size={18} />
            </label>
          </div>
        </div>
      </div>
      <br /><br />

      <div className="w-full px-2">
        <form onSubmit={handleSubmit}>
          <div className="w-full 800px:flex block pb-3">
            <div className="w-[100%] 800px:w-[50%]">
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                className={inputClass}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] 800px:w-[50%]">
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                className={inputClass}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full 800px:flex block pb-3">
            <div className="w-[100%] 800px:w-[50%]">
              <label className={labelClass}>Phone Number</label>
              <input
                type="number"
                className={inputClass}
                required
                value={`${phoneNumber}`}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="w-[100%] 800px:w-[50%] relative">
              <label className={labelClass}>Enter your password</label>
              <input
                type={visible ? "text" : "password"}
                className={inputClass}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>

          <button
            type="submit"
            className={`${styles.button} !w-[180px] !h-[42px] !rounded-md mt-4`}
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;