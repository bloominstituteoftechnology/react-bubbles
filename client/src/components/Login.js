import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Login = (props) => {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route

	const [login, setLogin] = useState({
		username: '',
		password: '',
	});

	function handleChange(e) {
		setLogin({
			...login,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		axiosWithAuth()
			.post('/login', login)
			.then((res) => {
				localStorage.setItem('token', res.data.payload);
				props.history.push('/bubble-page');
			})
			.catch((err) => console.error(err));
	}

	return (
		<>
			<h1>Welcome to the Bubble App!</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="username"
					value={login.username}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					value={login.password}
					onChange={handleChange}
				/>
				<button>Login</button>
			</form>
		</>
	);
};

export default Login;
