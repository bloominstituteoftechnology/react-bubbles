import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  // handle submit function and set state w/ useState ... confirm protects

  const [form, setForm] = useState ({
      username:'',
      password:'',
  })
  console.log(form);

  const handleSubmit = (event) => {
      event.preventDefault()
      axiosWithAuth().post('/login', form)
      .then(response => {
          console.log(response)
          localStorage.setItem('token', response.data.payload)
          props.history.push('/protected')
      })
      .catch(err => console.table(err))
  }

  return(
    <>
    <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
      <input
          name='username'
          type='text'
          placeholder='User name'
          value={form.username}
          onChange={(event) => {
              setForm({
                  ...form,
                  [event.target.name]:event.target.value
              })
          }}
          />
      <input
          name='password'
          type='password'
          placeholder='Password'
          value={form.password}
          onChange={(event) => {
              setForm({
                  ...form,
                  [event.target.name]:event.target.value
              })
          }}
          />
          <button type='submit'>Submit</button>
      </form>
      </>
  )
}