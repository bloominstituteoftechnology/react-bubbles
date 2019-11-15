import React, {useState} from "react";
import { axiosWithAuth } from '../utils/axiosWithAuth'




const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [form, setForm] = useState({username: '', password: ''})
  const [isLoading, setIsLoading ] = useState(false)


 const handleChange = e => {
   setForm({...form, [e.target.name]: e.target.value})
 }


 const handleSubmit = e => {
   e.preventDefault();
   setIsLoading(true)
    axiosWithAuth()
    .post('/login', form)
    .then( res => {
     localStorage.setItem('token', res.data.payload)
     props.histroy.push(`/bubbles`)
    })
    .catch(error => console.log(error))
 }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
          <input type ='text' name ='username' value={form.username}  onChange={handleChange} />    
          <input type ='password' name ='password' value={form.password}  onChange={handleChange} />    
      </form>
      <button>Login</button> 
    </>
  );
};

export default Login;
