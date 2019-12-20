import React,{ useState } from "react";
import axios from 'axios';

// const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route


  const Login = (props) => {
    const [login, setLogin] = useState (
        {
            username: '',
            password: ''
        }
    );

    const handleInput = e => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
        console.log(login)
    };

    const handleLogin = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/login', login)
        .then(response => {
            console.log(response);
            localStorage.setItem ('token', response.data.payload);
            props.history.push ('/protected');
        })

        .catch(err => console.log(err.message));
    };
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <form onSubmit = {handleLogin}>  
                    UserName: 
                    <input
                        type='text'
                        name = 'username'
                        value = {login.username}
                        onChange = {handleInput}
                    />

                    Password: 
                    <input
                        type='password'
                        name = 'password'
                        value = {login.password}
                        onChange = {handleInput}
                    />

                    <button>
                        LogIn
                    </button>
                </form>
    </>
  );
};

export default Login;
