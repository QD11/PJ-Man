import React from 'react'
import {useNavigate} from 'react-router-dom'
import { logOutTeam } from '../../redux/teamSlice'
import { fetchLogOut } from '../../redux/userSlice'
import { isAdmin } from '../../redux/adminSlice'
import { emptyProjects } from '../../redux/projectSlice'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const team = useSelector(state => state.team)

    const onClickTeams = () => {
        dispatch(logOutTeam())
        dispatch(isAdmin(false))
        dispatch(emptyProjects())
        navigate('/')
    }

    const handleLogOut = () => {
        dispatch(fetchLogOut('/logout'))
        dispatch(isAdmin(false))
        dispatch(emptyProjects())
        navigate('/')
    }

    return (
        <NavDiv className="NavDiv">
            <button onClick={onClickTeams}>Back to Teams</button>
            <div>
                <button onClick={() => navigate(`/${team.name}`)}>Home</button>
            </div>
            <button onClick={handleLogOut}>Logout</button>
        </NavDiv>
    )
}

const NavDiv = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #434343;
    height: 40px;
    box-shadow: 0 0px 30px -6px rgba(0,0,0,0.9);
`

export default NavBar
