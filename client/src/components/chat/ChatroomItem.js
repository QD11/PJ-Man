import React, {useState, useEffect, useContext} from 'react'
import {useSelector} from 'react-redux'
import Avatar from 'react-avatar'
import styled from 'styled-components'
import {ActionCableContext} from '../../index'

const ChatroomItem = ({chatroom, setCurrentReceiver, setAllChatrooms}) => {
    const cable = useContext(ActionCableContext)
    const user = useSelector(state => state.user)
    const [lastMessage, setLastMessage] = useState("")
    
    useEffect(() => {
        fetch(`/last_message/${chatroom.id}`)
        .then(resp => resp.json())
        .then(message => setLastMessage(message))
    }, [])

    useEffect(() => {
        const channel = cable.subscriptions.create({
            channel: "MessagesChannel",
            chatroom_id: chatroom.id
        },
        {
            received: (newMessage) => {
                setLastMessage(newMessage)
                setAllChatrooms(allChatrooms => allChatrooms.map(chatroom => {
                    if (chatroom.id === newMessage.chatroom.id) {
                        return({
                            ...chatroom,
                            last_message: {
                                ...chatroom.last_message,
                                created_at: newMessage.created_at,
                                id: newMessage.id,
                                message: newMessage.message,
                                team_user_id: newMessage.team_user.id,
                                updated_at: newMessage.created_at
                            }
                        })
                    }
                    else {
                        return({
                            ...chatroom
                        })
                    }
                }))
            }
        })
    }, [])
    
    
    if (!lastMessage) {
        return null
    }
    const otherMember = chatroom.chat_members.find(chat_member => chat_member.team_user.user_id !== user.id).team_user
    // const lastMsg = messages[messages.length - 1].message

    const handleClick=() => {
        setCurrentReceiver(otherMember)
    }

    return (
        // <ChatItemDiv onClick={() => setCurrentReceiver(otherMember)}>
        <ChatItemDiv onClick={handleClick}>
                <Avatar key={user.id}  src={otherMember.user.profile_picture_url} name={otherMember.user.first_name + ' ' +  otherMember.user.last_name} round={true} size="40" textSizeRatio={1.75}/>
            <div className="message-div">
                <span className="name">{otherMember.user.first_name + ' ' +  otherMember.user.last_name}</span>
                <span className="msg" >{lastMessage.message.length < 15 ? lastMessage.message : lastMessage.message.slice(0,15)+"..."}</span>
            </div>
        </ChatItemDiv>
    )
}

const ChatItemDiv = styled.div`
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    display: flex;
    cursor: pointer;
    box-shadow: 0 0px 20px -10px rgb(0 0 0 / 50%);
    align-items: center;
    flex-direction: row;
    .message-div {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        .msg {
            color: grey;
        }
        .name {
            font-weight: 400;
            font-size: 20px;
        }
    }
`

export default ChatroomItem
