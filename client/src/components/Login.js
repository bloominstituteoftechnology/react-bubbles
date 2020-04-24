import React, {useState} from "react";
import {axiosWithAuth} from '../utils/axiosWithAuth';


const initialState = {
  
    username: 'Lambda School',
    password: 'i<3Lambd4',
    isFetching: false
  
  
}



const Login = props => {
  

  const [login, setLogin] = useState(initialState)

const handleChange = e =>{
  setLogin({
    
      ...login, [e.target.name]: e.target.value
    
  })
}

  const handleLogin = e => {
    e.preventDefault();
    setLogin({...login, isFetching: true});
    axiosWithAuth()
    .post('/login', login)
    .then(res =>{
      console.log('LOG IN POST', res)
      localStorage.setItem('token', res.data.payload)
      props.history.push('/bubble-page')
    }).catch(err =>{console.log(err, 'POST ERROR LOGGING IN')})
  }
  




  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  return (
    <>
    <div>
      <h1>Welcome to the Bubble App!</h1>
      </div>

      <div>
      <h2>Login Here!</h2>
      </div>

      <div>
        <form onSubmit={handleLogin}>
        <input 
        label= 'Username'
        type = 'text'
        name = 'username'
        placeholder = 'username'
        value={login.username}
        onChange={handleChange}
        />
        <input 
        label="Password"
        type="password"
        name="password"
        placeholder="password"
        value={login.password}
        onChange={handleChange}

        />
        <br/>
        
        <button>Log In</button>
        {login.isFetching && 'Blowing bubbles'}
        </form>
      </div>
    </>
  );
};

export default Login;
