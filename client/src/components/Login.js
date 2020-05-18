import React, { Component } from "react";
import axios from 'axios';

class Login extends Component {
  state = {
    credentials: {
      username: '',
      password: ''
    }
  };

  componentDidMount() {
    localStorage.clear();
  }
  handleSubmit = e => {
    e.preventDefault();

  axios
   .post('http://localhost:5000/api/login', this.state.credentials)
   .then(response => {
    console.log(response.data);
    localStorage.setItem('token', response.data.payload);
    this.props.history.push('/BubblePage');
  })
  .catch(error => {
    console.log(error);
  });
};

handleChange = e => {
  this.setState({
    credentials: {
      ...this.state.credentials,
      [e.target.name]: e.target.value
    }
 });
};

render() {
  return (
    <div>
    <h1>Login</h1>
    <form onSubmit={this.handleSubmit}>
      <input
        className='input'
        type='text'
        name='username'
        value={this.state.credentials.username}
        onChange={this.handleChange}
        placeholder='UserName:'
      />
      <input
        className='input'
        type='password'
        name='password'
        value={this.state.credentials.password}
        onChange={this.handleChange}
        placeholder='Password:'
      />
      <button>Log In</button>
    </form>
  </div>
)}}

export default Login;

//username === Lambda School && password === i<3Lambd4