import React, {useState} from "react";
import {axiosWithAuth} from "./AxiosWithAuth"

const Login = (props) => {
  const [error, setError]= useState()
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
      localStorage.setItem("token", result.data.token)
      props.history.push("/login")
    })
    .catch((err)=>{
      setError(err.response.data)
    })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">
          {error}</div>}
      <input
        type="username"
        name="username"
        placeholder="username"
        value= {user.username}
        OnChange={handleChange}
      />
       <input
        type="password"
        name="password"
        placeholder="Password"
        value= {user.password}
        OnChange={handleChange}
      />
      <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
