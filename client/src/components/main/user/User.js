import React from 'react'
import UserCard from './UserCard'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const User = () => {
    const user = useSelector(state => state.user)
    const team_user = useSelector(state => state.team).team_users.find(team_user => team_user.user_id === user.id)

    return (
        <UserDiv>
            <UserCard user={user} team_user={team_user} />
        </UserDiv>
    )
}

const UserDiv = styled.div`
    display: flex;
    justify-content: center;
`


export default User
