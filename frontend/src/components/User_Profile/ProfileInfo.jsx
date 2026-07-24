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

  // Update Info Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  // Avatar Upload Handler
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

  return (
    <>
      {/* Avatar Section */}
      <div className="flex justify-center w-full">
        <div className="relative">
          <img
            src={`${backend_url}${user?.avatar?.url}`}
            className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
            alt=""
          />
          <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
            <input type="file" id="image" className="hidden" onChange={handleImage} />
            <label htmlFor="image" className="cursor-pointer">
              <AiOutlineCamera />
            </label>
          </div>
        </div>
      </div>
      <br /><br />

      {/* Update Form */}
      <div className="w-full px-5">
        <form onSubmit={handleSubmit}>
          <div className="w-full 800px:flex block pb-3">
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Email Address</label>
              <input
                type="email"
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full 800px:flex block pb-3">
            <div className="w-[100%] 800px:w-[50%]">
              <label className="block pb-2">Phone Number</label>
              <input
                type="number"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={`${phoneNumber}`}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="w-[100%] 800px:w-[50%] relative">
              <label className="block pb-2">Enter your password</label>
              <input
                type={visible ? "text" : "password"}
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          </div>
          <input
            className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] hover:bg-[#3a24db] hover:text-white rounded-[3px] mt-8 cursor-pointer transition-all`}
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;