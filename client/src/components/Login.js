import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

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
    // console.log(this.state.credentials.username);
  };

  render() {
    return (
      <div className='formBody'>
        <h1 className=''>Login</h1>
        <form className='formArrange' onSubmit={this.handleSubmit}>
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

          <button className='button'>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
