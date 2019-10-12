import React, { useState } from 'react';
import {axiosAuth} from './axiosAuth';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";




class Login extends React.Component{
  constructor(props){
      super(props);
      this.state ={
          username: '',
          password:''
      };
  }
  
  changeHandle =e => this.setState({[e.target.name]: e.target.value})

  // regSubmit = e => {
  //     const firstName = this.state.firstName;
  //     const password = this.state.password;
  //     const email = this.state.email;
  //     console.log(password)
  // }

  

  addUser = e =>  {  
      e.preventDefault();
      console.log(this.state)
      axiosAuth()
      .post('http://localhost:5000/api/login', this.state)
      .then( res => {  localStorage.setItem('token',res.data.payload)
      console.log("REZ!",res.data)
            //    props.history.push('/');

       }
  
  
      )
      .catch (err =>{
          console.log(err)
      
  
      })
  
       console.log('ADDUSER STATE', this.state) }

       addPerson = e => {
          e.preventDefault();
         const user = this.state
  
           this.addUser(user)
          this.setState( {  
           username:'',
          password:'',
          
         })
          console.log('STATE',this.state)
          console.log('NEW!!', user)
              
      }

       

  render(){

      return (
          <div className= 'reg'>
          <h1>Register</h1>

          <form 
          className ='regForm'
          
          type= 'submit'  >
          <input
             type ='text'
             name ='username'
             placeholder = 'userName'
             value={this.state.username}
             onChange={this.changeHandle}/> 
           
             <input
             type ='password'
             name ='password'
             placeholder = 'password'
             value={this.state.password}
             onChange={this.changeHandle}/> 

             <button type = 'submit' className ='regSubmit' onClick={this.addUser}>SUBMIT</button>


          </form>
          


          </div>
      )
  }



}

export default Login