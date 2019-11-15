import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  
//   console.log(key)
  return axios.create({
    baseURL: 'https://localhost:5000',
    headers: {
      Authorization: 
      "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98"
    }
  });
}
