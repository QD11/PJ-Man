import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getUser } from '../../redux/userSlice'
import SignupForm from './SignupForm'
import logo from '../../pajamas.png'

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
        <WholeSec>
            <BigDiv>
                <h1>PJ MAN</h1>
                <img src={logo} height={200} width={200}/>
                <form onSubmit={handleSubmit}>
                    <div className="email-password">
                        <label>Email</label>
                        <input autoComplete="off" type="text" onChange={handleChange} name="email"></input>
                    </div>
                    <div className="email-password">
                        <label>Password</label>
                        <input autoComplete="off" type="password" onChange={handleChange} name="password"></input>
                    </div>
                    <button className="submit-btn" type="submit">{isLoading? "Loading..." : "LOG IN"}</button>
                </form>
            <span>{errors}</span>
            <button onClick={()=> navigate('/signup')}> Create an Account </button>
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

    & h1 {
        padding: 4px 0;
        color: #4285F4;
        font-size: 40px;
        font-weight: 700;
        text-transform: uppercase;
        margin-block-start: 0em;
        margin-block-end: 0em;
    }

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

export default LoginForm
