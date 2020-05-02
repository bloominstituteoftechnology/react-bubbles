import axios from "axios"

const token = localStorage.getItem("token");

const axiosWithAuth = () => (
    axios.create({
        baseURL: 'http://localhost:5000',
        headers: {
            Authorization: token,
        }
    })
)

export default axiosWithAuth;