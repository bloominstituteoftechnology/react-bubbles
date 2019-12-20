import React, { useState } from 'react';


export function LoginForm() {
    const [form, setForm] = useState ({
        username:'',
        password:'',
    })
    console.log(form);

    const handleSubmit = (event) => {
        event.preventDefault()
        axiosWithAuth().post('/api/login', form)
        .then(response => {
            console.log(response)
            localStorage.setItem(response.data.payload)
        })
        .catch(err => console.table(err))
    }

    return(
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
    )
}