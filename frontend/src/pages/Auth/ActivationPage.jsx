import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { axiosServerInstance } from "../../server.js";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ActivationPage.jsx
  useEffect(() => {
    if (!activation_token) return;

    const endpoint = type === "seller" ? "shop" : "user";

    const sendRequest = async () => {
      try {
        const res = await axiosServerInstance.post(`/${endpoint}/activation`, {
          activation_token,
        });

        if (res.data.token) {
          const tokenKey = type === "seller" ? "seller_token" : "token";
          localStorage.setItem(tokenKey, res.data.token);
          toast.success("Account activated successfully!");

          const redirectPath = type === "seller" ? "/dashboard" : "/";
          setTimeout(() => navigate(redirectPath), 1500);
        }
      } catch (err) {
        setErrorMessage(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    sendRequest();
  }, [activation_token, type, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="bg-white border border-divider rounded-lg p-8 max-w-md w-full text-center">
        {loading ? (
          <>
            <div className="w-10 h-10 border-4 border-divider border-t-voltage rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-body text-ink/60">
              Verifying your activation link...
            </p>
          </>
        ) : errorMessage ? (
          <>
            <p className="font-body text-copper mb-4">{errorMessage}</p>
            <Link
              to="/login"
              className="text-voltage font-body text-sm hover:underline"
            >
              Back to Login
            </Link>
          </>
        ) : (
          <>
            <p className="font-display font-[600] text-stock text-lg mb-4">
              {type === "seller"
                ? "Your shop has been created successfully!"
                : "Your account has been created successfully!"}
            </p>
            <Link
              to={type === "seller" ? "/shop-login" : "/login"}
              className="text-voltage font-body text-sm hover:underline"
            >
              Continue to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivationPage;
