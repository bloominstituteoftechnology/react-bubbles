import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  state = {
    credentials: {
      username:'',
      password:''
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
    .post('/api/login', this.state.credentials)
    .then(res => {
      localStorage.setItem('token', res.data.payload);
      this.props.history.push('/protected');
      console.log(res)
    })
    .catch(err => 
      console.error('Lexi:Login.js login: err.message', err.message)
      );
    };

    render() {
      return(
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              name='usename'
              placeholder='Username'
              onChange={this.handleChange}
            />
            <input 
              type='text'
              name='password'
              placeholder='Password'
              onChange={this.handleChange}
            />
            <button>Login</button>
          </form>
        </div>
      );
    }

};

export default Login;