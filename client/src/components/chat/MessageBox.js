import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import {ActionCableContext} from '../../index'
import Message from './Message'

const MessageBox = ({currentReceiver, currentChatroom, userTeamUser, setAllChatrooms}) => {
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
                setAllChatrooms(allChatrooms => allChatrooms.map(chatroom => {
                    if (chatroom.id === currentChatroom.id) {
                        return ({
                            ...chatroom,
                            last_message: newMessage
                        })
                    }
                    else {
                        return ({
                            ...chatroom
                        })
                    }
                }))
                setAllChatrooms(allChatrooms => allChatrooms.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i))
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
        setMsgToSend('')
    }
    
    return (
        <MessageDiv>
            {currentReceiver && <div className="name">
                <Avatar src={currentReceiver.user.profile_picture_url} name={currentReceiver.user.first_name + ' ' +  currentReceiver.user.last_name} round={true} size="20" textSizeRatio={1.75}/>
                <span>{currentReceiver.user.first_name + ' ' +  currentReceiver.user.last_name}</span>
            </div>}
            <div className="messages-div">
                {messages.map(message => <Message key={message.id} teamUser={userTeamUser} message={message} />)}
            </div>
            <div className="message-send">
                <form onSubmit={submitMsg}>
                    <input className="sender" type="text" value={msgToSend} onChange={e => setMsgToSend(e.target.value)}/>
                    <button className="sender-submit" type="submit">Send</button>
                </form>
            </div>
        </MessageDiv>
    )
}

const MessageDiv = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 5px;
    width: 90%;
    height: 320px;
    border: 1px solid #cbcbcb;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 20px -6px;
    background: #f4f7ff99;
    padding: 10px 0px 10px 10px;
    .messages-div {
        height: 80%;
        // border: 1px solid black;
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
    .message-send {
        height: 5%;
        .sender {
            width: 70%;
            font-size: 18px;
            // height: 40px;
            // padding: 7px;
            border-radius: 6px;
            background: #fbfbfb;
            border: 2px solid transparent;
            height: 25px;
            box-shadow: 0 0 0 1px #dddddd, 0 2px 4px 0 rgb(0 0 0 / 7%), 0 1px 1.5px 0 rgb(0 0 0 / 5%);
        }
        .sender-submit {
            margin-left: 5px;
            font-size: 20px;
            border: 0;
            outline: 0;
            cursor: pointer;
            color: rgb(60,66,87);
            background-color: rgb(255,255,255);
            box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
            border-radius: 4px;
            font-size: 20px;
            font-weight: 500;
            padding: 4px 8px;
            display: inline-block;
            min-height: 28px;
            -webkit-transition: background-color .24s,box-shadow .24s;
            transition: background-color .24s,box-shadow .24s;
        }
    }
`

export default MessageBox
