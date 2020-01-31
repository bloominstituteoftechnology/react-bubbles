import React, {useState, useEffect} from "react";
import axios from 'axios';

const Login = (props) => {
  //set state
  const [credentials, setCredentials] = useState({username:'', password:''})
  const [loading, setLoading] = useState(false);
  //handle form changes
  const handleChange = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      }
    );
    console.log(`${e.target.name} is:`, e.target.value)
  };
   //handle form submission & make a post request to retrieve a token from the api
   const handleLogin = e => {
    e.preventDefault();
    setLoading(true);
    console.log('Loggin in....')
    axios.post('http://localhost:5000/api/login', credentials)
    .then(res => {
    window.localStorage.setItem('token', res.data.payload)
    console.log('Logged In Response:', res)
    props.history.push('/bubbles')
    setLoading(false);
    })
  .catch(err => console.log(err));
   
  };
  // when you have handled the token, navigate to the BubblePage route
  return (
    <div className='loginWrapper'>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form className='LoginForm' onSubmit={handleLogin}>
            <label>Username:</label>
            <input
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
            />
             <label>Password</label>
            <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
            />
          {(!loading) ? <button color='info'>Log in</button> : <button color='info' disabled>Loading...</button>}
        </form>
    
    </div>
  );
};

export default Login;
