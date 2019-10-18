import React from "react";

const Login = () => {
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
            </form>
            </div>
    </>
  );
};

export default Login;
