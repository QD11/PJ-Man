import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import {BsChatRightDots} from 'react-icons/bs'
import {RiAddFill} from 'react-icons/ri'
import CreateRoom from './CreateRoom'
import MessageBox from './MessageBox'
import ChatroomList from './ChatroomList'
import { ActionCableContext } from '../../index'
import {useSelector} from 'react-redux'

const ChatBar = () => {
    const cable = useContext(ActionCableContext)
    const [openSideBar, setOpenSideBar] = useState(true)
    const [currentReceiver, setCurrentReceiver] = useState(null)
    const [channel, setChannel] = useState(null)
    const team = useSelector(state => state.team)
    const user = useSelector(state => state.user)
    const userTeamUser = team.team_users.find(teamUser => teamUser.user_id === user.id)
    const [allChatrooms, setAllChatrooms] = useState([])

    //subscribe to the create chatroom channel here
    useEffect(() => {
        fetch(`/team_users/${userTeamUser.id}/chatrooms`)
        .then(resp => resp.json())
        .then(data => setAllChatrooms(data))

        const channel = cable.subscriptions.create({
            channel: 'NewChatroomChannel',
            team_id: team.id
        },
        {
            received: (newChatroom) => {
                if (newChatroom.chat_members.find(chat_member => chat_member.team_user.id === userTeamUser.id)){
                    setAllChatrooms(allChatrooms => [...allChatrooms, newChatroom])
                }
            }
        })
        setChannel(channel)
        // return () => {
        //     channel.unsubscribe()
        // }
    }, [team])
    
    const currentChatroom = currentReceiver ? allChatrooms.find(chatroom => chatroom.chat_members.some(chat_member => chat_member.team_user.id === currentReceiver.id)) : null
    
    return (
        <ChatDiv>
            {/* <BsChatRightDots onClick={() => setOpenSideBar(openSideBar => !openSideBar)} />
            {openSideBar &&  */}
                <div className="chat-div">
                    {/* <div className="add-div"><RiAddFill /></div> */}
                    <CreateRoom channel={channel} setCurrentReceiver={setCurrentReceiver} allChatrooms={allChatrooms}/>
                    <ChatroomList allChatrooms={allChatrooms} setCurrentReceiver={setCurrentReceiver}/>
                    {currentChatroom && <MessageBox userTeamUser={userTeamUser} currentReceiver={currentReceiver} currentChatroom={currentChatroom}/>}
                </div>
            // }
        </ChatDiv>
    )
}

const ChatDiv = styled.div`
    right: 0;
    position: fixed;
    background: white;
    width: 17%;
    z-index: 50;
    // margin-top: 39.99px;

    .chat-div {
        // width: 300px;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
`

export default ChatBar
