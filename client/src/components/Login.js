import React,{useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const Login = () => {
  const [form,setForm]=useState({
    username:'',
    password:''
})
console.log(form)

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Please Log in here</p>
      <form onSubmit={(e)=>{
            e.preventDefault();
            axiosWithAuth().post('/login',form)
            .then(res=>{
                console.log(res)
                localStorage.setItem('token',res.data.payload)
            })
            .catch(err =>{console.log(err)})
        }} >
        <input
        name='username'
        type='text'
        placeholder='Username'
        value={form.username}
        onChange={e=>{
            setForm({
                ...form,
                [e.target.name]:e.target.value
            })
        }}
        />
        <input
        name='password'
        type='password'
        placeholder='Password'
        value={form.password}
        onChange={e=>{
            setForm({
                ...form,
                [e.target.name]:e.target.value
            })
        }}
        />

        <button type='submit'>Submit.</button>
    </form>
    </>
  );
};

export default Login;
