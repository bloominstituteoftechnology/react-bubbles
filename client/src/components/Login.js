import React from "react";
import AxiosWithAuth from './axiosWithAuth'
import {Button, TextInput, Pane} from 'evergreen-ui'

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
    <div className='foorm'>
      <h1>Welcome to the Bubble App!</h1>
      <div>
        {console.log(this.state.userInfo)}
        <Pane display='flex'
        justify-content='center' 
        borderTop='muted' 
        elevation={2}
        alignItems="center"
        >

        <form onSubmit={this.onSubmit}>
          <label>Username : </label>
          <TextInput margin='14' type='text' name="username" placeholder="Input USERID" value={this.state.userInfo.username} onChange={this.onChange} />

          <label> Password: </label>
          <TextInput type="password" name="password" placeholder="Input PASSKEY" value={this.state.userInfo.password} onChange={this.onChange} />

          <Button className='but' intent='primary' margin='auto'>Submit</Button>

        </form>

        </Pane>
      </div>
    </div>

  );
};
}
export default Login;
