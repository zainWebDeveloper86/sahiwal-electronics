import axios from "axios";
const server = `${import.meta.env.VITE_SERVER_URL}api/v2`;

export const axiosServerInstance = axios.create({
  baseURL: server,
  withCredentials: true, // send also Cookies (for local dev)
});

// Har request ke sath, agar localStorage mein token hai, header mein attach karo.
// Yeh third-party-cookie-blocking wale browsers ke liye fallback hai.
axiosServerInstance.interceptors.request.use((config) => {
  const userToken = localStorage.getItem("token");
  const sellerToken = localStorage.getItem("seller_token");

  // Attach to headers if available
  if (userToken) config.headers["x-auth-token"] = userToken;
  if (sellerToken) config.headers["x-seller-token"] = sellerToken;

  return config;
});

// export const backend_url = import.meta.env.VITE_SERVER_URL; // for local
export const backend_url = ""; // for live(cloudinary handle the complete url)
