import axios from "axios";

export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");
export const setToken = token => localStorage.setItem("token", token);

export default function api() {
  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: getToken()
    }
  });
}