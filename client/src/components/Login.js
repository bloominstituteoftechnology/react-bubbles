import React, { useState} from "react";
import axios from 'axios';
import { H1, H2, LoginContainer, LoginForm, Input, Button } from './LoginStyles';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [user, setUser] = useState({username: '', password: ''});

  const login = e => {
    e.preventDefault()
    axios
      .post('http://localhost:5000/api/login', user)
      .then(res => {
        console.log(res)
        localStorage.setItem('token', res.data.payload)
        props.history.push('/bubbles')
      })
      .catch(err => console.log(err))
  }
    const handleChange = e => {
      setUser({
        ...user,
        [e.target.name]: e.target.value
      })
      console.log(user)
    }
 



  return (
    <LoginContainer>
      <H1>Welcome to the Bubble App!</H1>
      <LoginForm onSubmit = {login}>
        <H2>Sign in</H2>
        <label htmlFor = 'Username'>
          <Input
            name = 'username'
            placeholder = 'Username'
            value = {user.username}
            type = 'text'
            onChange = {handleChange}
          />
        </label>
        <label htmlFor = 'Password'>
          <Input
            type = 'text'
            name = 'password'
            value = {user.password}
            placeholder = 'Password'
            onChange = {handleChange}
          />
        </label>
        <Button className = 'button'>Login</Button>s
      </LoginForm>
    </LoginContainer>
  );
};  

export default Login;
