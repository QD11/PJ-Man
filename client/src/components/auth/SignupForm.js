import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

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
                navigate('/');
            } else {
                r.json().then((err) => setErrors(err.errors));
            }
        });
        // fetch("/me")
    }



    return (
        <WholeSec>
            <BigDiv>
                <form onSubmit={handleSubmit}>
                    <div className="email-password">
                        <label>First Name</label>
                        <input autocomplete = "off" onChange={handleChange} type="text" name="first_name"></input>
                    </div>
                    <div className="email-password">
                        <label>Last Name</label>
                        <input autocomplete = "off" onChange={handleChange} type="text" name="last_name"></input>
                    </div>
                    <div className="email-password">
                        <label>Email</label>
                        <input autocomplete = "off" onChange={handleChange} type="text" name="email"></input>
                    </div>
                    <div className="email-password">
                        <label>Password</label>
                        <input autocomplete = "off" onChange={handleChange} type="password" name="password"></input>
                    </div>
                    <div className="email-password">
                        <label>Confirm Password</label>
                        <input autocomplete = "off" onChange={handleChange} type="password" name="password_confirmation"></input>
                    </div>
                    <span>{errors}</span>
                    <button className="submit-btn" type="submit">{isLoading? "Loading...": "Signup"}</button>
                </form>
                <button onClick={()=> navigate('/')}> Cancel </button>
            </BigDiv>
        </WholeSec>
    )
}

const WholeSec = styled.section`
    display:flex;
    justify-content: center;
    align-items: center;
    height:100vh;  
`

const BigDiv = styled.div`
    // display:flex;
    font-family: "Roboto", sans-serif;
    background-color: white;
    box-shadow: 1px 1px 5px 3px rgb(132 133 132 / 20%);
    border-radius: 10px;
    padding: 40px;
    text-align: center;
    background-color: #fff;
    height: 500px;
    width: 500px;

    .submit-btn {
        margin-top: 20px;
        margin-bottom: 20px;
        outline: none;
        background: #4285F4;
        // background: #434343;
        width: 100%;
        border: 0;
        border-radius: 4px;
        padding: 12px 20px;
        color: #FFFFFF;
        font-family: inherit;
        font-size: inherit;
        font-weight: 500;
        line-height: inherit;
        text-transform: uppercase;
        cursor: pointer;
    }

    .email-password {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
        & label {
            width: fit-content;
            margin: 0 0 10px;
            color: rgba(0, 0, 0, 0.6);
            font-size: 12px;
            font-weight: 500;
            line-height: 1;
            text-transform: uppercase;
            letter-spacing: 0.2em;
        }
        & input {
            outline: none;
            display: block;
            background: rgba(0, 0, 0, 0.1);
            width: 100%;
            border: 0;
            border-radius: 4px;
            box-sizing: border-box;
            padding: 12px 20px;
            color: rgba(0, 0, 0, 0.6);
            font-family: inherit;
            font-size: inherit;
            font-weight: 700;
            line-height: inherit;
            transition: 0.3s ease;
        }
    }
`

export default SignupForm
