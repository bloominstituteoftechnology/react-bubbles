import React, { useState } from "react";
import axios from 'axios';

const Login = ({history}) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(
    {
      username: "Lambda School",
      password: "i<3Lambd4"
    }
  );

  const [dummy, setDummy] = useState(
    {
      dummyUser: '',
      dummyPass: ''
    }
  )

  const handleChange = event => {
    setDummy({...dummy, [event.target.name]: event.target.value});
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios.post('http://localhost:5000/api/login', login)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        history.push("/protected");
      })
      .catch(err => console.log(err.response));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
      <input type="text"
             name="dummyUser"
             placeholder="username"
             onChange={handleChange}
             value={dummy.dummyUser} />
      <input type="password"
             name="dummyPass"
             placeholder="password"
             onChange={handleChange}
             value={dummy.dummyPass} />
      <button type="submit">Log In</button>
    </form>
    </>
  );
};

export default Login;
