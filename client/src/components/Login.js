import React from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth.js';

const Login = (props) => {

  const [credentials, setCredentials] =useState({username: '', password: ''})

  const handleChange = e => {
    setCredentials(
      {
        ...credentials,
        [e.target.name]: e.target.value
      }
    );
  };

  const login = e => {
    e.preventDefault();
    console.log(credentials)
    axiosWithAuth()
    .post ('/login', credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      props.history.push('/colors');
    })
    .catch(err => console.log(err))
  };


  return (
    <>
      <h1 className='header'>Welcome to the Bubble App!</h1>
        <form onSubmit = {login}>
          <input
          type='text'
          name='username'
          value={credentials.username}
          onChange={handleChange}/>

          <input
          type='password'
          name='password'
          value={credentials.password}
          onChange={handleChange}/>

          <button type='submit'>Log In</button>
        </form>
    </>
  );
};

export default Login;

// import React from "react";

// const Login = () => {
//   // make a post request to retrieve a token from the api
//   // when you have handled the token, navigate to the BubblePage route
//   return (
//     <>
//       <h1>Welcome to the Bubble App!</h1>
//       <p>Build a login page here</p>
//     </>
//   );
// };

// export default Login;
