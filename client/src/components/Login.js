import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth"
import styled from "styled-components"

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid red;
  color: palevioletred;
  margin: 0 auto;
  padding: 0.25em 1em;
`

const Form = styled.form`
  background: transparent;
  border-radius: 3px;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  `
 // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
function Login(props) {
	const [error, setError] = useState()
	const [data, setData] = useState({
		username: "",
		password: "",
	})

	const handleChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		axiosWithAuth()
			.post("/api/login", data)
			.then(result => {

				window.localStorage.setItem('token', result.data.payload)

				props.history.push("/bubblepage")
			})
			.catch(err => {
				setError(err.response.data.message)
			})
	}
	
	return (
		<Form onSubmit={handleSubmit}>
			{error && <div className="error">{error}</div>}

			<input type="username" name="username" placeholder="Username" value={data.username} onChange={handleChange} />
			<input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />

			<Button type="submit">Log In></Button>
		</Form>
	)
}

export default Login;
