import React from 'react'
import { useState } from 'react'

const login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:4000/user/sign-in',{
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            })
        })
        .then(response=> response.json())
        .then((data)=>{localStorage.setItem('token',data.jwtToken)})
    }
      return (
    <form action="" onSubmit={handleSubmit}>
        <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" 
        onChange={(e) => setPassword(e.target.value)}placeholder='password'/>
        <button type="submit">Log in</button>
    </form>
  )
}

export default login