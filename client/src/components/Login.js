import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [text, setText] = useState({
    username: '',
    password: ''
  })

  console.log(text)

  const handleChanges = e => {
    setText({...text, [e.target.name]: e.target.value})
  }

  const submitHandler = e => { 
    e.preventDefault()
    axiosWithAuth()
      .post('/api/login', text)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubblepage')
        
      })
      .catch(res => console.log(res))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <div className='login'>
        <form onSubmit={submitHandler}>
          <input 
          name='username'
          type='text'
          value={text.username}
          onChange={handleChanges}
          placeholder='username'
          />
          <input 
          name='password'
          type='password'
          value={text.password}
          onChange={handleChanges}
          placeholder='password'
          />
          <button>Submit</button>
        </form>
      </div>
      
    </>
  );
};

export default Login;
