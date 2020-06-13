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

    axiosWithAuth
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
              placeholder='Must contain 5 characters'
              onChange={this.handleChange}
              minLength='5'
              required 
            />
            <input 
              type='password'
              name='password'
              placeholder='Min 8 characters w/ special character'
              onChange={this.handleChange}
              minLength='8'
              pattern='(?=.*\d)(?=.*[\W_]).{7,}'
              required
            />
            <button>Login</button>
          </form>
        </div>
      );
    }

};

export default Login;
