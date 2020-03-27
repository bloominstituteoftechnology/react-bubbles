import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const[inputs, setInputs] = useState({
        username: '',
        password: ''
    });

    const changeHandler = (e) => {
        setInputs({
          ...inputs,
          [e.target.name]: e.target.value
        });
    };

    const postInputs = () => {
        axios
            .post(`http://localhost:5000/api/login`, inputs)
            .then(res => {
              console.log(res.data.payload);
              localStorage.setItem('token', JSON.stringify(res.data.payload));
              history.push('/bubble')
            })
            .catch(err => console.log(err));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postInputs();
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                name='username'
                placeholder='enter username'
                value={inputs.username}
                onChange={changeHandler}
                />
                <br></br>
                <input 
                type='password'
                name='password'
                placeholder='enter password'
                value={inputs.password}
                onChange={changeHandler}
                />
                <button type='submit'>
                  Submit!
                </button>
            </form>
        </div>
    );
};

export default Login;
