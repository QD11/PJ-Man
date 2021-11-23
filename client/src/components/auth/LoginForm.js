import React, { useState, useContext } from 'react'
import {useRouter} from 'next/router'

const LoginForm = () => {
    const router = useRouter()
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })

    const handleChange = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    

    return (
        <>
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input type="text" onChange={handleChange} name="email"></input>
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" onChange={handleChange} name="password"></input>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            <button onClick={()=> router.push('/signup')}> Create an Account </button>
        </>
    )
}

export default LoginForm
