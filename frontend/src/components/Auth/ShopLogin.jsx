import { React, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles.js";
import { Link, useNavigate } from "react-router-dom";
import { axiosServerInstance } from "../../server.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadSeller } from "../../redux/actions/seller.js";

const ShopLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginWithGoogle = async (credentialResponse) => {
    try {
      await axiosServerInstance.post("/shop/google-login", {
        credential: credentialResponse.credential,
      });
      toast.success("Logged in with Google!");
      dispatch(loadSeller());
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Google login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    await axiosServerInstance
      .post("/shop/login-shop", { email, password })
      .then(() => {
        toast.success("Login Success!");
        dispatch(loadSeller());
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-display font-[700] text-ink">
          Login to your shop
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-divider rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  minLength="6"
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
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-voltage focus:ring-voltage border-divider rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm font-body text-ink">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/shop/forgot-password" className="font-body font-medium text-voltage hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 text-sm font-body font-[600] rounded-md text-white bg-voltage hover:opacity-90 disabled:opacity-50"
              >
                {isSubmitting ? "Logging in..." : "Submit"}
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full font-body`}>
              <h4 className="text-ink/70">Not have any account?</h4>
              <Link to="/shop-create" className="text-voltage pl-2 hover:underline">
                Sign Up
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
                onError={() => toast.error("Google login failed")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopLogin;