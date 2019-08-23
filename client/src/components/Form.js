import React from "react";
import axios from 'axios';
import './Form.css'

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  console.log(props)

  const [user, setUser] = useState({ username: '', password: '' });

  const handleChange = event => setUser({ ...user, [event.target.name]: event.target.value });

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/login', user)

      .then(response => {
        // successful 
        console.log("post login api response object", response);

        localStorage.setItem('token', response.data.payload);
        props.history.push('/bubbles');
      })

      .catch(error => {
        // unsuccessful 
        console.log("The api is currently down.", error.response);
      });
  };

  return (
    <div class="signin">
      <form onSubmit={handleSubmit} >
        <h1 className="form-title">SIGN IN</h1>
        <input
          name="username"
          className="form-input"
          type="text"
          onChange={handleChange}
          placeholder="Enter Username" />
        <input
          className="form-input"
          type="text"
          onChange={handleChange}
          placeholder="Enter Password" />
        <button
          className="form-button">Sign In</button>
      </form>
    </div>

  );
};

export default Login;
