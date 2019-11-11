import axios from "axios"

export function getToken() {
	return localStorage.getItem("token")
}

export default function axiosWithAuth() {
	return axios.create({
		baseURL: "http://localhost:5000",
		headers: {
            'Authorization': getToken(),
		},
	})
}