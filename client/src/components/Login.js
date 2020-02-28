import React, { useState }from "react";
import { useForm } from "react-hook-form";
import axiosWithAuth from "../utils/axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

const [data, setData] = useState({});
  const handleChange = e => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => {
    axiosWithAuth()
      .post("/login", data)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubblePage");
      });
    }
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={data.username}
            onChange={handleChange}
            ref={register({ required: true, maxLength: 80 })}
          />
          <br />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={handleChange}
            ref={register({ required: true })}
          />
          <br />
          <button onClick={handleSubmit}>log in</button>
          
        </form>
      </div>
    );
  };

export default Login;
