import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { axiosServerInstance } from "../../server.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loadUser } from "../../redux/actions/user.js";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async (credentialResponse) => {
    try {
      const { data } = await axiosServerInstance.post("/user/google-login", {
        credential: credentialResponse.credential,
      });
      toast.success("Welcome!");
      dispatch(loadUser());
      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Google sign-up failed");
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axiosServerInstance
      .post("/user/create-user", newForm, config)
      .then((res) => {
        toast.success(res.data?.message);
        setEmail("");
        setName("");
        setPassword("");
        setAvatar(null);
        if (res.data.success === true) {
          navigate("/login");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-display font-[700] text-ink">
          Create your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-divider rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-body font-medium text-ink">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-divider rounded-md placeholder-ink/30 focus:outline-none focus:border-voltage font-body sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-body font-medium text-ink">
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-divider rounded-md placeholder-ink/30 focus:outline-none focus:border-voltage font-body sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-body font-medium text-ink">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  minLength="4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-divider rounded-md placeholder-ink/30 focus:outline-none focus:border-voltage font-body sm:text-sm"
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
                  <span>Upload a photo</span>
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
                className="group relative w-full h-10 flex justify-center py-2 px-4 text-sm font-body font-[600] rounded-md text-white bg-voltage hover:opacity-90"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full font-body`}>
              <h4 className="text-ink/70">Already have an account?</h4>
              <Link to="/login" className="text-voltage pl-2 hover:underline">
                Sign In
              </Link>
            </div>
          </form>
          <div className="mt-4">
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-divider"></div>
              <span className="px-3 text-ink/40 text-sm font-body">OR</span>
              <div className="flex-1 border-t border-divider"></div>
            </div>
            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleLoginWithGoogle}
                onError={() => toast.error("Google sign-up failed")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singup;
