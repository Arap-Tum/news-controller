// authService.js
import axios from "./authAPI";

export const registerUser = (userData) => {
  return axios.post('/auth/register', userData);
};

export const logInUser = (credentials) => {
  return axios.post('/auth/login', credentials);
};
