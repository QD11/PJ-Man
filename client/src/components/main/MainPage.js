import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

import { logOutTeam } from '../../redux/teamSlice'

const MainPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const team = useSelector(state => state.team)

    console.log(team)


    const onClickTeams = () => {
        dispatch(logOutTeam())
        navigate('/')
    }

    return (
        <>
            <button onClick={onClickTeams}>Back to Teams</button>
        </>
    )
}

export default MainPage
