import axios from "axios";

// const axiosWithAuth = () => {
//   const token = localStorage.getItem("token");
//   return axios.create({
//     baseURL: "http://localhost:5000",
//     headers: {
//       Autorization: token
//     }
//   });
// };

// export default axiosWithAuth;

export function getToken() {
  return localStorage.getItem('token')
}
export default function axiosWithAuth() {
  return axios.create({
      baseURL: 'http://localhost:5000',
      headers: {
          Authorization: getToken()
      },
  })
}
