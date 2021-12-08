import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { motion } from "framer-motion"
import styled from 'styled-components'
import {fetchLogOut} from '../../redux/userSlice'
import {emptyProjects} from '../../redux/projectSlice'
import {isAdmin} from '../../redux/adminSlice'
import { useNavigate} from 'react-router-dom';

import TeamCard from './TeamCard'
import NewTeam from './NewTeam'

const TeamsLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [newTeamForm, setNewTeamForm] = useState(false)
    const [recruitResp, setRecruitResp] = useState("")
    const [joinForm, setJoinForm] = useState(false) 
    const [teams, setTeams] = useState([])
    const [code, setCode] = useState("")


    const MINUTE_MS = 60000;

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetch(`/${user.id}/organizations`)
    //         .then(resp => resp.json())
    //         .then(data => setOrganizations(data))
    //     }, MINUTE_MS)

    useEffect(() => {
        fetch(`/${user.id}/teams`)
        .then(resp => resp.json())
        .then(data => setTeams(data))
    }, [user])

    const handleClick = () => {
        dispatch(fetchLogOut('/logout'))
        dispatch(isAdmin(false))
        dispatch(emptyProjects())
        navigate('/')
    }

    const joinSubmit = (e) => {
        e.preventDefault()
        fetch('/join', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: code,
                user_id: user.id,
                email: user.email,
            }),
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(team => setTeams(teams => [...teams, team]))
            } else {
                r.json().then((err) => setRecruitResp(err.errors));
            }})
    }

    return (
        <div>
            <button onClick={handleClick}>Log Out</button>
            <button onClick={()=>setNewTeamForm(bool => !bool)}>New Team</button>
            <button onClick={()=>setJoinForm(joinForm => !joinForm)}>Join Team </button>
            {joinForm && 
                <form onSubmit={joinSubmit}>
                    <label>Enter Code: </label>
                    <input type="text" name="code" onChange={(e) => setCode(e.target.value)}></input>
                    <button type="submit">Submit</button>
                    <span>{recruitResp}</span>
                </form>
                }
            {newTeamForm ? <NewTeam setTeams={setTeams} setNewTeamForm={setNewTeamForm}/> 
                : 
                <MotionUl>
                    {teams.map(team => <TeamCard key={team.id} team={team} />)}
                </MotionUl> 
            }
        </div>
    )
}


const MotionUl = styled(motion.ul)`
    color: #2b2b81;
    list-style: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0px;
    border-radius: 25px;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
    margin-top: 50px;
    align-items: center;
`

export default TeamsLayout
