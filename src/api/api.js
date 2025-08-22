import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'https://news-72me.onrender.com/api', // Adjust the base URL as needed

});

export default axiosInstance;
