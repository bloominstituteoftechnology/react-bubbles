import React from "react";
import { useForm } from 'react-hook-form';
import axiosWithAuth from '../auth/axiosWithAuth';
import PrivateRoute from "./PrivateRoute";

const Login = (props) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    reset();
    axiosWithAuth()
      .post('/login', data)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        props.history.push(`/private`);
      })
      .catch((err) => 
        console.log('Error', err));
    };


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit(onsubmit)}>
        <input
          type='text'
          name='username'
          placeholder='username'
          ref={register}
        />
        <br></br>
        <input
          type='password'
          name='password'
          placeholder='password'
          ref={register}
        />
        <br></br>
        <input
          type='submit'
          value='Log In'
        />
      </form>
    </>
  );
};

export default Login;
