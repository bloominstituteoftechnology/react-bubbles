import React, { Component } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';
import '../index.css';

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

    axiosWithAuth()
      .post('/api/login', this.state.credentials)
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

  redirectToBubbles = () => {
    this.history.push('/login'); 
};

  render() {
    return (
      <div className='formBody'>
        <h1 className=''>Login To See Bubbles!</h1>
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
            type='text'
            name='password'
            value={this.state.credentials.password}
            onChange={this.handleChange}
            placeholder='Password:'
          />

          <button onclick={this.redirectToBubbles}>Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;