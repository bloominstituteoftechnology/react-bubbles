import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'

const Login = props => {
    const [error, setError] = useState()
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axiosWithAuth()
            .post('/login', user)
            .then(res => {
                localStorage.setItem('token', res.data.payload)
                props.history.push('/bubble-page')
            })
            .catch(err => {
                setError(err.response.data.message)
            })
    }

    return (
      <div style={{display:'flex', flexDirection:'column'}}>
        <h2>Login here to see the Bubbles!</h2>
        <form onSubmit={handleSubmit} style={{textAlign:'left'}}>
          <div>Username</div>
          <input
            type='text'
            name='username'
            value={user.username}
            onChange={handleChange}
            />
          <div>Password</div>
          <input
            type='password'
            name='password'
            value={user.password}
            onChange={handleChange}
            />
          <button>Login</button>
        </form>
      </div>
    )};

export default Login
