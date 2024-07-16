import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});
