import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axiosAuth from "../utils/axiosAuth";

const Login = () => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	const history = useHistory();
	const [login, setLogin] = useState({
		username: "",
		password: "",
	});

	const handleChanges = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axiosAuth()
			.post("/api/login", login)
			.then((res) => {
				console.log(res);
				localStorage.setItem(res.data.payload);
			})
			.catch((err) => console.log(err.response));
		history.push("/bubble-page");
		setLogin({
			username: "",
			password: "",
		});
	};
	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			<br />
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">
					Username:
					<input
						type="text"
						name="username"
						value={login.username}
						onChange={handleChanges}></input>
				</label>
				<label htmlFor="password">
					Password:
					<input
						type="text"
						name="password"
						value={login.password}
						onChange={handleChanges}></input>
				</label>
				<button type="submit">Submit</button>
			</form>
		</>
	);
};

export default Login;
