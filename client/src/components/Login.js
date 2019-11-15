import React, { useState } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';
import { Cluster } from '@potion/layout';
import { Pattern } from '@potion/extra';
import { Svg, Circle, Group } from "@potion/element";



const Login = props => {


  const [user, setUser] = useState ('');
  const [password, setPassword] = useState ('');

const useHandler = e => {
    e.preventDefault();
    setUser(e.target.value)
};

const passwordHandler = e => {
    e.preventDefault();
setPassword(e.target.value)
};

const handleSubmit = e => {
    e.preventDefault();
  let credentials = {
    username: user,
    password: password
}



axiosWithAuth()
.post('http://localhost:5000/api/login', credentials)
.then(response => {localStorage.setItem ('token', response.data.payload)
      props.history.push('/bubble-page');
})
.catch(error => console.log('error', error.response))
    setUser('');
    setPassword('')
}	  
  return (
    <>
  
    <div className='main'>
    
   
      <h1 className='bounce-in-left'>Bubble App</h1>
      <div className= 'login-form'>
      <form onSubmit={handleSubmit}>
        <input  className= 'login' type="text" value={user} onChange={useHandler} placeholder="username" />
        <input className= 'login' type="password" value={password} onChange={passwordHandler} placeholder="password" />
        <button className= 'login-btn' >Login</button>
    </form>
   
    <Svg width={400} height={400}>
  <Group transform={{ translate: [40, 80] }}>
    <Cluster
      data={{
        children: [
          {
            value: 10,
            key: '1',
            children: [
              { value: 1, key: '1a1' },
              { value: 2, key: '1a2' },
              {
                value: 3,
                key: '1a3',
                children: [
                  { value: 0.1, key: '1b1' },
                  { value: 0.2, key: '1b2' },
                ],
              },
            ],
          },
          {
            value: 20,
            key: '2',
            children: [
              { value: 1, key: '2a1' },
              { value: 2, key: '2a2' },
              {
                value: 3,
                key: '2a3',
                children: [
                  { value: 0.1, key: '2b1' },
                  { value: 0.2, key: '2b2' },
                ],
              },
            ],
          },
        ],
      }}
      size={[240, 320]}
      nodeEnter={d => ({ ...d, x: 200, y: 200 })}
      animate
    >{nodes => nodes.map(({ key, x, y }) => (
      <Circle
        key={key}
        cx={y}
        cy={x}
        r={10}
        fill="black"
      />
    ))}</Cluster>
  </Group>
</Svg>
    </div>
    </div>
    </>
  );
};

export default Login;
