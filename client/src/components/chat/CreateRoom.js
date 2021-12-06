import React, {useState} from 'react'
import styled from 'styled-components'
import {BsChatRightDots} from 'react-icons/bs'
import {RiAddFill} from 'react-icons/ri'
import {useSelector} from 'react-redux'
import Avatar from 'react-avatar'

const CreateRoom = ({setCurrentReceiver, allChatrooms, channel}) => {
    const [open, setOpen] = useState(false)
    const [search, setSearch] = useState('')
    const team = useSelector(state => state.team)
    const user = useSelector(state => state.user)
    const userTeamUser = team.team_users.find(team_user => team_user.user_id === user.id)
    const teamUsers = team.team_users.filter(team_user => team_user.user_id !== user.id)
    
    const filteredTeamUsers = search ? teamUsers.filter(teamUser => (teamUser.user.first_name+teamUser.user.last_name).toUpperCase().includes(search.toUpperCase())) :  []

    const handleClick = (teamUser) => {
        if (!allChatrooms.flatMap(chatroom => chatroom.chat_members).find(chatmember => chatmember.team_user.id === teamUser.id)) {
            //if chatroom doesn't exist with this user
            const data ={
                one_team_user_id: userTeamUser.id,
                two_team_user_id: teamUser.id
            }
            channel.send(data)
        }
        setCurrentReceiver(teamUser)
    }

    return (
        <div>
            <RiAddFill onClick={() => setOpen(open => !open)}/>
            {open && 
                <div>
                    <input type="search" placeholder="Search Member" onChange={e => setSearch(e.target.value)}/>
                    {filteredTeamUsers.map(teamUser => 
                        <div key={teamUser.id}>
                            <Avatar key={user.id}  src={teamUser.user.profile_picture_url} name={teamUser.user.first_name + ' ' +  teamUser.user.last_name} round={true} size="20" textSizeRatio={1.75}/>
                            <span>{teamUser.user.first_name + ' ' +  teamUser.user.last_name}</span>
                            <button onClick={() => handleClick(teamUser)}>Message!</button>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default CreateRoom
