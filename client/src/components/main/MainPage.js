import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate, Route, Routes} from 'react-router-dom'
import { logOutTeam } from '../../redux/teamSlice'
import { isAdmin } from '../../redux/adminSlice'

import Home from './home/Home'

import NavBar from './NavBar'

const MainPage = () => {
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const user = useSelector(state => state.user)
    //where fetch projects happens
    dispatch(isAdmin(team.team_users.find(team_user => team_user.id === user.id).admin))

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
