import axios from "axios";

export const authWithAxios = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "http://localhost:5000/",
    headers: {
      Autherization: token
    }
  });
};