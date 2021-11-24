import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { AnimateSharedLayout, motion } from "framer-motion"
import styled from 'styled-components'

import TeamCard from './TeamCard'
import NewTeam from './NewTeam'

const TeamsLayout = () => {
    const user = useSelector(state => state.user)
    const [newTeamForm, setNewTeamForm] = useState(false)
    const [teams, setTeams] = useState([])

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

    return (
        <div>
            <button onClick={()=>setNewTeamForm(bool => !bool)}>New Team</button>
            {newTeamForm ? <NewTeam setTeams={setTeams} setNewTeamForm={setNewTeamForm}/> 
                : <AnimateSharedLayout>
                    <MotionUl layout>
                        {teams.map(team => <TeamCard key={team.id} team={team} />)}
                    </MotionUl>
                    </AnimateSharedLayout> 
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
