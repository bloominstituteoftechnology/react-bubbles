import React, { useState } from "react";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route


    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    function handleChanges(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
 
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            props.submitUser(user)
        }}>
            <input type="text" name='username' value={user.username} onChange={handleChanges} />
            <input type="password" name='password' value={user.password} onChange={handleChanges} />
            <button>Log In!</button>
        </form>
    )
}

export default Login;
