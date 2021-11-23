import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const SignupForm = () => {
    const navigate = useNavigate()
    const [signup, setSignup] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])

    const handleChange = e => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        })
    }

    console.log(signup)

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signup),
            }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
                r.json().then(user => console.log(user));
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
        // fetch("/me")
    }



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name</label>
                    <input onChange={handleChange} type="text" name="first_name"></input>
                </div>
                <div>
                    <label>Last Name</label>
                    <input onChange={handleChange} type="text" name="last_name"></input>
                </div>
                <div>
                    <label>Email</label>
                    <input onChange={handleChange} type="text" name="email"></input>
                </div>
                <div>
                    <label>Password</label>
                    <input onChange={handleChange} type="password" name="password"></input>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input onChange={handleChange} type="password" name="password_confirmation"></input>
                </div>
                <span>{errors}</span>
                <button type="submit">{isLoading? "Loading...": "Signup"}</button>
            </form>
            <button onClick={()=> navigate('/')}> Cancel </button>
        </div>
    )
}

export default SignupForm
