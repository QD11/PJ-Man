import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import {ActionCableContext} from '../../index'
import Message from './Message'

const MessageBox = ({currentReceiver, currentChatroom, userTeamUser}) => {
    const cable = useContext(ActionCableContext)
    const [channel, setChannel] = useState(null)
    const [messages, setMessages] = useState([])
    const [msgToSend, setMsgToSend] = useState('')

    useEffect(() => {
        fetch(`/chatrooms/${currentChatroom.id}/chat_messages`)
        .then(resp => resp.json())
        .then(messages => setMessages(messages))

        const channel = cable.subscriptions.create({
            channel: "MessagesChannel",
            chatroom_id: currentChatroom.id
        },
        {
            received: (newMessage) => {
                setMessages(messages => [...messages, newMessage])
            }
        })
        setChannel(channel)
        return () => {
            channel.unsubscribe()
        }
    }, [currentChatroom])

    const submitMsg = (e) => {
        e.preventDefault()
        const data = {
            sender_team_user_id: userTeamUser.id,
            message: msgToSend
        }
        channel.send(data)
    }
    
    return (
        <MessageDiv>
            {currentReceiver && <div>
                <Avatar src={currentReceiver.user.profile_picture_url} name={currentReceiver.user.first_name + ' ' +  currentReceiver.user.last_name} round={true} size="20" textSizeRatio={1.75}/>
                <span>{currentReceiver.user.first_name + ' ' +  currentReceiver.user.last_name}</span>
            </div>}
            <div className="messages-div">
                {messages.map(message => <Message key={message.id} teamUser={userTeamUser} message={message} />)}
            </div>
            <div className="message-send">
                <form onSubmit={submitMsg}>
                    <input type="text" onChange={e => setMsgToSend(e.target.value)}/>
                    <button type="submit">Send</button>
                </form>
            </div>
        </MessageDiv>
    )
}

const MessageDiv = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 100%;
    border: 1px solid black;
    .messages-div {
        height: 80%;
        border: 1px solid black;
    }
    .message-send {
        height: 20%;

    }
`

export default MessageBox
