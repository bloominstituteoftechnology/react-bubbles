import React from "react";
import axios from 'axios'
import AxiosWithAuth from './axiosWithAuth'

class Login extends React.Component {
  
  state = {
    userInfo : {
      username: '',
      password: ''
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    
    AxiosWithAuth().post('login', this.state.userInfo)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      this.props.history.push("/bubbles")
    })
  }

  onChange = (event) => {
    this.setState({
      userInfo: {
      ...this.state.userInfo, [event.target.name]: event.target.value
    }
      
    })

  }
  render() {
  
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <div>
        {console.log(this.state.userInfo)}
        <form onSubmit={this.onSubmit}>
          <label>Username : </label>
          <input type='text' name="username" placeholder="Input USERID" value={this.state.userInfo.username} onChange={this.onChange} />

          <label> Password: </label>
          <input type="password" name="password" placeholder="Input PASSKEY" value={this.state.userInfo.password} onChange={this.onChange} />

          <input type='submit' />
        </form>
      </div>
    </>

  );
};
}
export default Login;
