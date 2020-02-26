import React, {useState, useEffect} from "react";
import { axiosWithAuth } from '../utils/AxiosWithAuth'

const Login = (props) => {
  // console.log('props', props)
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })

  const login = e => {
    e.preventDefault()
   
    axiosWithAuth()
    .post('/login', credentials)
    .then(res => {
      console.log('login cred', res.data)
      localStorage.setItem('token', res.data.payload)
      console.log('payload', res.data.payload)
      props.history.push('/bubbles')
    })
    .catch(err => console.log('login error', err))

  }

  
  const handleChange = e => {
    console.log('targets', e.target.value)
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
            placeholder="user"
            value={setCredentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="user"
            value={setCredentials.password}
            onChange={handleChange}
          />
          <button type='submit'className="login">Log in</button>
            </form>
            </div>
    </>
  );
};

export default Login;
