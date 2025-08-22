import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "https://news-72me.onrender.com/api", // change to your API
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
