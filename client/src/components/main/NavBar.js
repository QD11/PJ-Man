import React from 'react'
import {useNavigate} from 'react-router-dom'
import { logOutTeam } from '../../redux/teamSlice'
import { fetchLogOut } from '../../redux/userSlice'
import {useDispatch} from 'react-redux'

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickTeams = () => {
        dispatch(logOutTeam())
        navigate('/')
    }

    const handleLogOut = () => {
        dispatch(fetchLogOut('/logout'))
        navigate('/')
    }

    return (
        <div>
            <button onClick={onClickTeams}>Back to Teams</button>
            <button onClick={handleLogOut}>Logout</button>
        </div>
    )
}

export default NavBar
