import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Route, Routes} from 'react-router-dom'
import { isAdmin } from '../../redux/adminSlice'
import { fetchTeam } from '../../redux/teamSlice'

import ChatBar from '../chat/ChatBar'

import Home from './home/Home'
import User from './user/User'

import NavBar from './NavBar'

const MainPage = () => {
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const user = useSelector(state => state.user)
    const MINUTE_MS = 60000; //one minute

    useEffect(() => {
        dispatch(fetchTeam(`/teams/${team.id}`))
        dispatch(isAdmin(team.team_users.find(team_user => team_user.user_id === user.id).admin))
        //fetch projects every 15 seconds
        const interval = setInterval(() => {
            dispatch(fetchTeam(`/teams/${team.id}`))
        }, MINUTE_MS/0.75);
        
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/*" element={<Home />} />
                <Route path="/user" element={<User/>} />
            </Routes>
            
        </>
    )
}

export default MainPage
