import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { axiosServerInstance } from "../../server.js";
import { Link } from "react-router-dom";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (activation_token && !hasRun.current) {
      hasRun.current = true;
      const endpoint = type === "seller" ? "shop" : "user";

      const sendRequest = async () => {
        await axiosServerInstance
          .post(`/${endpoint}/activation`, { activation_token })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setErrorMessage(err.response?.data?.message || "Something went wrong");
          })
          .finally(() => {
            setLoading(false);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="bg-white border border-divider rounded-lg p-8 max-w-md w-full text-center">
        {loading ? (
          <>
            <div className="w-10 h-10 border-4 border-divider border-t-voltage rounded-full animate-spin mx-auto mb-4"></div>
            <p className="font-body text-ink/60">Verifying your activation link...</p>
          </>
        ) : errorMessage ? (
          <>
            <p className="font-body text-copper mb-4">{errorMessage}</p>
            <Link to="/login" className="text-voltage font-body text-sm hover:underline">
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
