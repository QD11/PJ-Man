import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, Route, Routes} from 'react-router-dom'
import { logOutTeam } from '../../redux/teamSlice'
import { isAdmin } from '../../redux/adminSlice'
import { fetchProjects } from '../../redux/projectSlice'

import Home from './home/Home'

import NavBar from './NavBar'

const MainPage = () => {
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const user = useSelector(state => state.user)
    const MINUTE_MS = 60000; //one minute
    //where fetch projects happens
    dispatch(isAdmin(team.team_users.find(team_user => team_user.user_id === user.id).admin))

    useEffect(() => {
        dispatch(fetchProjects(`/${team.id}/projects`))

        //fetch projects every 15 seconds
        const interval = setInterval(() => {
            dispatch(fetchProjects(`/${team.id}/projects`))
        }, MINUTE_MS/1);
        
        return () => clearInterval(interval);
    }, [team])

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
