//import Dependencies
import React, { useState } from "react";
// file import (Authentication)
import { axiosWithAuth } from "../util/axiosWithAuth";

// useState for Login
const Login = (props) => {
	const [cred, setCred] = useState({
		credentials: {
			username: "",
			password: "",
		},
	});

// handleChange
	const handleChange = (e) => {
		setCred({
			credentials: {
				...cred.credentials,
				[e.target.name]: e.target.value,
			},
		});
	};

	// Login Authorization
	const login = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post("/login", cred.credentials)
			.then((res) => {
				console.log("Login : res ", res);
				localStorage.setItem("token", res.data.payload);
				props.history.push("/bubbles");
			})
			.catch((err) => {
				console.log("ERROR WITH LOGIN: ", err);
			})
			.finally(() => window.location.reload());
	};

	return (
		// MY BUILT OUT LOGIN FORM
		<div className="myform">
			<form onSubmit={login}>
				<input className="myinput"
					type="text"
					name="username"
					placeholder="Username"
					value={cred.credentials.username}
					onChange={handleChange}
				/>
				<input className="myinput"
					type="password"
					name="password"
					placeholder="Password"
					value={cred.credentials.password}
					onChange={handleChange}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
