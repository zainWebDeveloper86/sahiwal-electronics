import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosServerInstance } from "../../server.js";

const ForgotPasswordPage = () => {
  const location = useLocation();
  const userType = location.pathname.includes("/shop/") ? "shop" : "user";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        userType === "shop" ? "/shop/forgot-password" : "/user/forgot-password";
      const { data } = await axiosServerInstance.post(endpoint, { email });
      toast.success(data.message);
      setSubmitted(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-surface">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-2xl font-display font-[600] text-ink">
          {userType === "shop" ? "Shop " : ""}Forgot Password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-divider rounded-lg sm:px-10">
          {submitted ? (
            <p className="text-center text-ink/60 font-body">
              If that email is registered, a reset link has been sent. Please
              check your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-body font-medium text-ink">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-divider rounded-md focus:outline-none focus:border-voltage font-body sm:text-sm"
                placeholder="you@example.com"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full flex justify-center py-2 px-4 rounded-md text-white bg-voltage hover:opacity-90 font-body font-[600] disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
              <div className="mt-4 text-center">
                <Link
                  to={userType === "shop" ? "/shop-login" : "/login"}
                  className="text-voltage text-sm font-body hover:underline"
                >
                  Back to {userType === "shop" ? "Shop " : ""}Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;