import React, { useState } from "react";
import { Form, Input, Button } from "semantic-ui-react";
import axiosWithAuth from '../utils/axiosWithAuth';

const Login = (props) => {
  const [credentials, setCredentials] = useState({username: '', password: ''});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    axiosWithAuth()
      .post("/login", credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubble-page');
      })
      .catch(err => console.log(err));
  }

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  }

  return (
    <>
    {isLoading ? ('Loading...') : (
      <>
        <h1>Welcome to the Bubble App!</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Username</label>
            <Input 
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Input 
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Field>
          <Button>Log In</Button>
        </Form>
      </>
    )}
    </>
  );
};

export default Login;