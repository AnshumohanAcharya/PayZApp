import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://54.197.214.187:8000/",
  headers: {
    authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});
