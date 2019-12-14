import React, {useState} from "react";
import axiosWithAuth from '../utils/axiosWithAuth'
import styled from 'styled-components';

const Container = styled.div`
  border: .5px solid grey;
  margin-left:45%;
  margin-top:10%;
  padding:1%;
  height:20%;
  width: 10%;
`

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState ({
    username: '',
    password: ''
  });

  const onSubmit = event => {
    event.preventDefault();

    axiosWithAuth()
      .post('/login', credentials)
      .then(result => {
        console.log('kid:login:axios.post', result.data)
        localStorage.setItem('token', result.data.payload);
        props.history.push('/bubblepage');
        console.log('kd:login:props', props)
      })
      .catch(error => 
        console.log('kd:login:axios.catch:error', error));
  };

  const handleChange = event => {
    setCredentials ({
      ...credentials, 
      [event.target.name] : event.target.value
    })
  };
    
  
  return (
    <>
    <Container>
      <h2>Log In to Bubbles</h2>
    <form onSubmit = {onSubmit}>
        <input
          type = 'text'
          name = 'username'
          placeholder = '* username'
          value = {credentials.username}
          onChange = {handleChange}
        />
        <br></br>
        <br></br>

      <input  
        type = 'password'
        name = 'passowrd'
        placeholder = '* password'
        value = {credentials.password}
        onChange = {handleChange}
        />
        <br></br>
        <br></br>

        <button> Log In </button>
      </form>
    </Container>
    
    </>
  );
};

export default Login;
