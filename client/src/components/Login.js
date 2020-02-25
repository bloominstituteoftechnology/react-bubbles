import React, {useState} from "react";
import { axiosWithAuth } from "../utils/AxiosWithAuth";

const Login = (props) => {
  console.log('props', props)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const login = e => {
    e.preventDefault()
    axiosWithAuth()
    .post('/api/login', credentials)
    .then(res => {
      console.log('login cred', res.data)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => console.log('login error', err))
  }

  const handleChange = e => {
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }
  
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className="reg">
      <form className="logs" onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button type='submit'className="login">Log in</button>
            </form>
            </div>
    </>
  );
};

export default Login;
