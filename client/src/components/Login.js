import React,{useState, useEffect} from "react";
import axios from 'axios';
import S from 'styled-components';
import LoginForm from './LoginForm';

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [userInformation, setUserInformation] = useState({
    username: '',
    password: '',
})
  const handleChange = (event) => setUserInformation({...userInformation, [event.target.name]: event.target.value});
  const {username, password} = userInformation;
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/login', {username, password})
    .then( (response) => {
      console.log(response.data);
        localStorage.setItem('token', response.data.payload);
        props.history.push('/bubbles');
    })
    .catch( error =>  {
        console.log(error);

    });
}
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <LoginForm handleChange={handleChange} handleSubmit={handleSubmit} userInformation={userInformation} setUserInformation={setUserInformation}/>
    </>
  );
};

export default Login;
