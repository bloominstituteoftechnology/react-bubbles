import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    "Content-Type": 'application/json',
    headers: {
      Authorization: token
    }
  });
};
