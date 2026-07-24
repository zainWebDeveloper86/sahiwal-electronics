import axios from "axios";
const server = "http://localhost:8000/api/v2";

export const axiosServerInstance = axios.create({
  baseURL: server,
  withCredentials: true,
});

export const backend_url = "http://localhost:8000/";