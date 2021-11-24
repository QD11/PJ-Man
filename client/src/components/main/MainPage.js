import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { logOutTeam } from '../../redux/teamSlice'

import NavBar from './NavBar'

const MainPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const team = useSelector(state => state.team)

    const onClickTeams = () => {
        dispatch(logOutTeam())
        navigate('/')
    }

    return (
        <>
            <NavBar />
        </>
    )
}

export default MainPage
