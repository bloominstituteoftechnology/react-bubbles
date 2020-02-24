import axios from 'axios' 

const AxiosWithAuth = () => {
    return axios.create({
        baseURL: 'http://localhost:5000/api',
        header: {
            authorization: localStorage.getItem('token')
        }
    })
}

export default AxiosWithAuth