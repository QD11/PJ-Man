import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'


const NewTeam = ({setTeams, setNewTeamForm, joinSubmit, recruitResp, setCode}) => {
    const user = useSelector(state => state.user)
    const [errors, setErrors] = useState([])
    const [teamForm, setTeamForm] = useState({
        name: '',
        description: '',
        user_id: user.id,
        email: user.email,
    })

    const handleChange = (e) => {
        setTeamForm({
            ...teamForm,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/teams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(teamForm),
        }).then((r) => {
            if (r.ok) {
                r.json()
                .then((data) => {
                    setTeams(orgs => [...orgs, data])
                    setNewTeamForm(false)
                });
            } 
            else {
                r.json()
                .then((error) => setErrors(error.error));
            }
        });
    }

    return (
        <div>
            <MainDiv>
                <span className="title">Create a Team</span>
                <form onSubmit={handleSubmit} className="form">
                    <div>
                        <span>Name of the Team: </span>
                        <input type="text" name="name" onChange={handleChange}></input>
                    </div>
                    <div>
                        <span>Description: </span>
                        <input type="text" name="description" onChange={handleChange}></input>
                    </div>
                    <div className="error">
                        <span>{errors}</span>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </MainDiv>
            <MainDiv>
                <span className="title">Join a Team</span>
                <form onSubmit={joinSubmit} className="form">
                    <div>
                        <span>Code: </span>
                        <input type="text" name="name" onChange={e => setCode(e.target.value)}></input>
                    </div>
                    <div className="error">
                        <span>{recruitResp}</span>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </MainDiv>
        </div>
    )
}

const MainDiv = styled.div`
    margin-left: 10em;
    display: flex;
    align-items: center;
    flex-direction: column;
    list-style: none;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 20%);
    width: fit-content;
    border-radius: 10px;
    padding: 2em;
    margin-top: 50px;
    margin-bottom: 50px;
    overflow: hidden;
    // cursor: pointer;
    .title {
        font-size: 40px;
        margin-bottom: 25px;
    }
    .form {
        display: flex;
        flex-direction: column;
        & span {
            display: inline-block;
            width: 250px;
            font-size: 25px;
        }
        & input {
            font-size: 25px;
            width: 500px;
            padding: 7px;
            border-radius: 6px;
            // font-size: 16px;
            background: #fbfbfb;
            border: 2px solid transparent;
            height: 36px;
            box-shadow: 0 0 0 1px #dddddd, 0 2px 4px 0 rgb(0 0 0 / 7%), 0 1px 1.5px 0 rgb(0 0 0 / 5%);
            :focus{
                border: 2px solid #000;
                border-radius: 4px;
            }
        }
        & div {
            margin-bottom: 20px;
        }
        .error {
            margin-top: 0px;
            margin-bottom: 0px;
        }
        & button {
            display: block;
            margin-left:  auto;
            margin-right: 0;
            width: fit-content;
            font-size: 25px;
            
            display: inline-block;
            outline: 0;
            border: 0;
            cursor: pointer;
            background-color: white;
            border-radius: 4px;
            padding: 8px 16px;
            // font-size: 16px;
            font-weight: 600;
            color: #2d3748;
            border: 1px solid #cbd5e0;
            line-height: 26px;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);
        
        }
    }

`

export default NewTeam
