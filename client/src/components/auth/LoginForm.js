import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { getUser } from '../../redux/userSlice'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = e => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(loginForm),
            }).then((r) => {
                setIsLoading(false);
                if (r.ok) {
                r.json().then((user) => {
                    dispatch(getUser(user))
                });
                } else {
                r.json().then((error) => setErrors(error.error));
                }
            });
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
                    <button type="submit">{isLoading? "Loading..." : "Login"}</button>
                </form>
            </div>
            <span>{errors}</span>
            <button onClick={()=> navigate('/signup')}> Create an Account </button>
        </>
    )
}

export default LoginForm
