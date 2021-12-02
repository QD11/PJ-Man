import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, Route, Routes} from 'react-router-dom'
import { logOutTeam } from '../../redux/teamSlice'
import { isAdmin } from '../../redux/adminSlice'
import { fetchProjects, emptyProjects } from '../../redux/projectSlice'
import { fetchTeam } from '../../redux/teamSlice'

import Home from './home/Home'

import NavBar from './NavBar'

const MainPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const user = useSelector(state => state.user)
    const MINUTE_MS = 60000; //one minute
    //where fetch projects happens
    // if (!team.team_users.find(userr => userr.id === user.id)) {
    //     dispatch(logOutTeam())
    //     dispatch(isAdmin(false))
    //     dispatch(emptyProjects())
    //     navigate('')
    //     console.log('yi')
    // }

    // dispatch(isAdmin(team.team_users.find(team_user => team_user.user_id === user.id).admin))

    useEffect(() => {
        dispatch(fetchProjects(`/${team.id}/projects`))
        dispatch(fetchTeam(`/teams/${team.id}`))
        dispatch(isAdmin(team.team_users.find(team_user => team_user.user_id === user.id).admin))
        //fetch projects every 15 seconds
        const interval = setInterval(() => {
            dispatch(fetchTeam(`/teams/${team.id}`))
            dispatch(fetchProjects(`/${team.id}/projects`))
            // dispatch(fetchTeam(`/teams/${team.id}`))
        }, MINUTE_MS/6);
        
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/*" element={<Home />} />
            </Routes>
        </>
    )
}

export default MainPage
