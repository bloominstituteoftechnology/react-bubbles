import React, {useState} from "react";
import AxiosWithAuth from "../axiosWithAuth";

const Login = (props) => {
  const userCredentials = { username: 'Lambda School', password: 'i<3Lambd4' };
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const submitForm = event => {
    event.preventDefault();
    AxiosWithAuth()
      .post("/login", userLoginInfo)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        setUserLoginInfo({
          username: "",
          password: ""
        });
        props.history.push("/bubblepage");
      })
      .catch(err => console.log(err));
  };

  const [userLoginInfo, setUserLoginInfo] = useState({
    username: "",
    password: ""
  });

  const handleChanges = e => {
    setUserLoginInfo({ ...userLoginInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="formContainer">
      <div className="formBox">
        <form onSubmit={submitForm}>
          <input
            name="username"
            type="text"
            value={userLoginInfo.username}
            onChange={handleChanges}
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            value={userLoginInfo.password}
            onChange={handleChanges}
            placeholder="Password"
          />
          <button />
        </form>
      </div>
    </div>
  );
};

export default Login;
