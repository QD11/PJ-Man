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
                <>
                    {teams.map(team => <TeamCard key={team.id} team={team} />)}
                </> 
            }
        </div>
    )
}

const MotionUl = styled(motion.ul)`
    list-style: none;
    margin: 0;
    padding: 0;
    width: 250px;
    display: flex;
    flex-direction: column;
    background: white;
    padding: 20px;
    border-radius: 25px;
`

export default TeamsLayout
