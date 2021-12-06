import React, {useState, useEffect, useContext} from 'react'
import {useSelector} from 'react-redux'
import Avatar from 'react-avatar'
import styled from 'styled-components'
import {ActionCableContext} from '../../index'

const ChatroomItem = ({chatroom, setCurrentReceiver}) => {
    const cable = useContext(ActionCableContext)
    const [messages, setMessages] = useState([])
    const user = useSelector(state => state.user)

    useEffect(() => {
        fetch(`/chatrooms/${chatroom.id}/chat_messages`)
        .then(resp => resp.json())
        .then(messages => setMessages(messages))
    }, [])

    useEffect(() => {
        const channel = cable.subscriptions.create({
            channel: "MessagesChannel",
            chatroom_id: chatroom.id
        },
        {
            received: (newMessage) => {
                setMessages(messages => [...messages, newMessage])
            }
        })
    }, [])
    
    if (!messages.length) {
        return null
    }

    const otherMember = chatroom.chat_members.find(chat_member => chat_member.team_user.user_id !== user.id).team_user
    const lastMsg = messages[messages.length - 1].message

    const handleClick=() => {
        setCurrentReceiver(otherMember)
    }

    return (
        // <ChatItemDiv onClick={() => setCurrentReceiver(otherMember)}>
        <ChatItemDiv onClick={handleClick}>
            <div>
                <Avatar key={user.id}  src={otherMember.user.profile_picture_url} name={otherMember.user.first_name + ' ' +  otherMember.user.last_name} round={true} size="20" textSizeRatio={1.75}/>
                <span>{otherMember.user.first_name + ' ' +  otherMember.user.last_name}</span>
            </div>
            <span>{lastMsg.length < 15 ? lastMsg : lastMsg.slice(0,15)+"..."}</span>
        </ChatItemDiv>
    )
}

const ChatItemDiv = styled.div`
    border: 1px solid black;
    cursor: pointer;
`

export default ChatroomItem
