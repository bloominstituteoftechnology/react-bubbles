import React, {useState} from "react";
import {axiosWithAuth} from "./AxiosWithAuth"

const Login = props => {
  const [user, setUser] = useState({
    username: "",
    password: "",}
  )
  const handleChange = (event)=>{
    setUser({...user, 
      [event.target.name]: event.target.value,})
  }
  const handleSubmit = (event)=>{
    event.preventDefault()
    axiosWithAuth()
    .post("/api/login", user)
    .then((result)=>{
      console.log(result)
      localStorage.setItem("token", result.data.payload)
      props.history.push("/bubble-page")
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
       
      <input
        type="username"
        name="username"
        placeholder="username"
        value= {user.username}
        onChange={handleChange}
      />
       <input
        type="password"
        name="password"
        placeholder="Password"
        value= {user.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
