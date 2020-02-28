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

  handleChange = e =>{
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.value] : e.target.name
      }
    })
  }

  login = e => {
    e.preventDefault();
    axios
    .get('http://localhost:5000/api/login', this.state.credentials)
    .then(res => {
      window.localStorage.setItem("token", res.data.payload)
    })
    .catch(error => console.log("SOmething went wrong with the call",error))
  }

  render(){

    return(
     
      // when you have handled the token, navigate to the BubblePage route
        <div className="container">
        <div className="loginContainer">
    
         <form className="form" onSubmit={this.login}>
         <label className="label" htmlFor="Login">Login</label>
           <input type="text" 
           name="username"
            placeHolder="username"
            value={this.state.credentials.username}
            onChange={this.handleChange} />

           <input type="password" 
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
