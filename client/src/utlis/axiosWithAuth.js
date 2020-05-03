import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        headers: {
            Authorization: JSON.parse(token)
        }
    });
};

export default axiosWithAuth;