import axios from "axios";

export const axiosAuth=() => {
  const token = localStorage.getItem("token");

  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
}

// const axiosAuth =()=> {
//   const token = localStorage.getItem("token");

//   return axios.create({
//     // baseURL: 'http://localhost:5000/api',
 
//     headers: {
//             "Content-Type": "application/json",
//             Authorization: `${token}`
//           }
//   });
// };

// export default axiosAuth();