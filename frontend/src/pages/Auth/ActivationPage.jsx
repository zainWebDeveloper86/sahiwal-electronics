import React, { useState, useEffect, useRef } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { axiosServerInstance } from "../../server.js";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type"); // "user" or "seller"
  // const [error, setError] = useState(false);
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
            // setError(true);
            setErrorMessage(
              err.response?.data?.message || "Something went wrong",
            );
          })
          .finally(() => {
            setLoading(false);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading ? (
        <p>Verifying your activation link...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <p>
          {type === "seller"
            ? "Your shop has been created successfully!"
            : "Your account has been created successfully!"}
        </p>
      )}
    </div>
  );
};

export default ActivationPage;
