import React from "react";
import useInput from './useInput';
import axiosWithAuth from './axiosWithAuth';
import {useHistory} from 'react-router-dom'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [username,setusername,handleUsername] = useInput('')
  const [password,setPassword,handlePassword] = useInput('')
  const history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    const data = {
      username: username,
      password: password
    }

    axiosWithAuth().post("/api/login",data)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        history.push('/protected')
      })
      .catch(err => {
        console.log(err)
      })

   
    
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>username</label>
        <input type='text' name='username' value={username} onChange={e => handleUsername(e.target.value)} ></input>
        <label>password</label>
        <input type='text' name='password' value={password} onChange={e => handlePassword(e.target.value)} ></input>
        <button type='submit'>login</button>
      </form>
    </>
  );
};

export default Login;
