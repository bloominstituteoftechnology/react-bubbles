import React from "react";
import "./login.css";
import axios from "axios";






class Login extends React.Component {
  state ={
    credentials: {
      username: '',
      password: ''
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

  login = e => {
    e.preventDefault();

    axios
    .post('http://localhost:5000/api/login', this.state.credentials)
    .then(res => {
      window.localStorage.setItem("token", res.data.payload)
      this.props.history.push('./protected')
    })
    .catch(error => console.log("Something went wrong with the call",error))
  }

  render(){

    return(
     
      // when you have handled the token, navigate to the BubblePage route
        <div className="container">
        <div className="loginContainer">
    
         <form className="form" onSubmit={this.login}>
           <input 
           type="text" 
           name="username"
            placeholder="username"
            value={this.state.credentials.username}
            onChange={this.handleChange} />

           <input 
           type="password" 
           name="password" 
           placeholder="password"
           value={this.state.credentials.password}
           onChange={this.handleChange}
            />

           <button type="submit">Submit</button>
         </form>
        </div>
        </div>
      );
    };
  }
    
  

  // make a post request to retrieve a token from the api 

export default Login;
