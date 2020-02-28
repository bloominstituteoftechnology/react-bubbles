import React, {useState} from "react";
import axios from 'axios';

const Login = (props) => {
  console.log(props,'props login')
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = useState({username:'', password:''});

  const handleChange = e => {
    setCreds({...creds, [e.target.name]: e.target.value})
  };

  const log = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login',creds)
    .then(res => {
      console.log(res)
      window.localStorage.setItem('token', res.data.payload);
      props.history.push('/BubblePage')
    })
    .catch(err => console.log(err,'error posting data'))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={log} className='login-cont'>
            <label htmlFor='username'>
                <input
                type='text'
                name='username'
                placeholder='username'
                value={creds.username}
                onChange={handleChange}
                />
                </label>
                <label htmlFor='password'>
                    <input
                    type='password'
                    name='password'
                    placeholder='password'
                    value={creds.password}
                    onChange={handleChange}
                    />
                </label>

                <button type='submit'>Login</button>
            
        </form>
    )
    </>
  );
};

export default Login;
