import React, { useState } from 'react'
import axios from 'axios'

const initialLogin = {
  username: '',
  password: ''
}

const Login = (props) => {
  const [login, setLogin] = useState(initialLogin)

  const changeHandler = event => {
    event.persist()
    let value = event.target.value

    setLogin({ ...login, [event.target.name]: value })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios
      .post('http://localhost:5000/api/login', login)
      .then(res => {
        localStorage.setItem('token', res.data.payload)
        setLogin(initialLogin)
        props.history.push('/bubble')
      })
      .catch(err => console.log(err))
  }
  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>

      <legend>Login Here</legend>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          onChange={changeHandler}
          placeholder='Username'
          value={login.username}
        />

        <input
          type='password'
          name='password'
          onChange={changeHandler}
          placeholder='Password'
          value={login.password}
        />

        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Login
