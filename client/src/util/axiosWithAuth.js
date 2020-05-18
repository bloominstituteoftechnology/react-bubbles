//  Build a axiosWithAuth module to create an instance of axios with the authentication header
import axios from "axios";

// setting our token from local storage
export const axiosWithAuth = () => {
	const token = localStorage.getItem("token");

	return axios.create({
		baseURL: "http://localhost:5000/api",
		headers: {
			Authorization: token,
		},
	});
}; 