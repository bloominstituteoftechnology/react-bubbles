import React,{useEffect, useState} from 'react';
import axios from 'axios';
const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login,setLogin]=useState({
    username:'',
    password:''
});
const handleChange=e=>{
  setLogin({
      ...login,
      [e.target.name]:e.target.value
  })
  // console.log(login.username)
  // console.log(login.password)  
}
const LoginSubmit=e=>{
  e.preventDefault();
  // console.log(localStorage.token)
  axios.post('http://localhost:5000/api/login', login)
  .then(response=>{
      console.log(response);
      localStorage.setItem('token',response.data.payload);
      props.history.push("/BubblePage");
  })
  .catch(err=>{
      console.log(err);
      props.history.push("/");
  })
}
  return (
      <div>
      <h1>Welcome to the Bubble App!</h1>
            <h1>Login</h1>
            <form onSubmit={LoginSubmit}>
                <label htmlFor="username">Username: </label>
                <input name="username" type="text" onChange={handleChange} id="username"/>
                <label htmlFor="password">Password: </label>
                <input name="password" type="password" onChange={handleChange} id="password"/>
                <button type="submit">Submit</button>
            </form>
        </div>
  );
};

export default Login;