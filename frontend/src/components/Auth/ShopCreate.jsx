import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { FaHome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { axiosServerInstance } from "../../server.js";
import { toast } from "react-toastify";
import { RxAvatar } from "react-icons/rx";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();
    if (avatar) newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("phoneNumber", String(phoneNumber));
    newForm.append("zipCode", String(zipCode));
    newForm.append("address", address);

    axiosServerInstance
      .post("/shop/create-shop", newForm, config)
      .then((res) => {
        toast.success(res.data?.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar(null);
        setZipCode("");
        setAddress("");
        setPhoneNumber("");
        if (res.data?.success === true) {
          navigate("/shop-login");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message);
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(file);
  };

  const inputClass =
    "appearance-none block w-full px-3 py-2 border border-divider rounded-md placeholder-ink/30 focus:outline-none focus:border-voltage font-body sm:text-sm";
  const labelClass = "block text-sm font-body font-medium text-ink";

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative">
      <button
        onClick={() => navigate("/")}
        className="cursor-pointer absolute top-4 left-4 md:top-6 md:left-8 lg:top-8 lg:left-12 z-10 flex items-center gap-2 px-4 py-2 bg-white border border-divider rounded-lg text-ink hover:text-voltage hover:border-voltage transition-all duration-200 shadow-sm hover:shadow-md font-body text-sm font-medium group"
      >
        <FaHome
          size={16}
          className="text-ink/60 group-hover:text-voltage transition-colors"
        />
        Go to Home
      </button>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-display font-[700] text-ink">
          Register as a seller
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[35rem]">
        <div className="bg-white py-8 px-4 border border-divider rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className={labelClass}>Shop Name</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Phone Number</label>
              <div className="mt-1">
                <input
                  type="number"
                  name="phone-number"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email address</label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Address</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Zip Code</label>
              <div className="mt-1">
                <input
                  type="number"
                  name="zipcode"
                  required
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Password</label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  minLength="6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer text-ink/40"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer text-ink/40"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-surface border border-divider">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-10 w-10 text-ink/30" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-divider rounded-md text-sm font-body font-medium text-ink bg-white hover:bg-surface cursor-pointer"
                >
                  <span>Upload shop logo</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 text-sm font-body font-[600] rounded-md text-white bg-voltage hover:opacity-90"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full font-body`}>
              <h4 className="text-ink/70">Already have an account?</h4>
              <Link
                to="/shop-login"
                className="text-voltage pl-2 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopCreate;
