import React, {useState} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import Avatar from 'react-avatar'

const CreateRoom = ({setCurrentReceiver, allChatrooms, channel}) => {
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
        <SearchHolder>
            {/* <RiAddFill onClick={() => setOpen(open => !open)}/>
            {open &&  */}
                <div>
                    <SearchBar type="search" placeholder="Search Member" onChange={e => setSearch(e.target.value)}/>
                    <div className="list-container">
                        {filteredTeamUsers.map(teamUser => 
                            <div className="members" key={teamUser.id}>
                                <div>
                                    <Avatar key={user.id}  src={teamUser.user.profile_picture_url} name={teamUser.user.first_name + ' ' +  teamUser.user.last_name} round={true} size="20" textSizeRatio={1.75}/>
                                    <span>{teamUser.user.first_name + ' ' +  teamUser.user.last_name}</span>
                                </div>
                                <button onClick={() => handleClick(teamUser)}>Message!</button>
                            </div>
                        )}
                    </div>
                </div>
            {/* } */}
        </SearchHolder>
    )
}

const SearchHolder = styled.div`
    .list-container {
        margin-right: 15px;
        height: 100px;
        overflow-y: scroll;
        &::-webkit-scrollbar { 
            width:12px;
            }
        &::-webkit-scrollbar-thumb {
            margin-top: 5px;
            border-radius: 10px;
            background: #1289fe; 
            }
        &::-webkit-scrollbar-track-piece {
            margin-top: 15px;
    }
    }
    .members {
        display: flex;
        justify-content: space-between;
        // width: 280px;
        width: 80%;
        margin: 20px;
        
    }
`

const SearchBar = styled.input`
    display: flex;
    justify-content: space-between;
    align-items: center;
    // min-width: 150px;
    height: 44px;
    background-color: #253858;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 14px;
    cursor: pointer;
    width: 280px;
    margin: 10px;
`

export default CreateRoom
