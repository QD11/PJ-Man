import React from 'react'
import ChatroomItem from './ChatroomItem'
import styled from 'styled-components'

const ChatroomList = ({allChatrooms, setCurrentReceiver, setAllChatrooms}) => {
    const filteredChatrooms = allChatrooms.filter(chatroom => chatroom.last_message)

    const sortedChatrooms = filteredChatrooms.sort(function(a,b) {
        return new Date(b.last_message.created_at) - new Date(a.last_message.created_at)
    })

    return (
        <ChatRoomListDiv>
            {sortedChatrooms.map(chatroom => <ChatroomItem key={chatroom.id} setAllChatrooms={setAllChatrooms} chatroom={chatroom} setCurrentReceiver={setCurrentReceiver}/>)}
        </ChatRoomListDiv>
    )
}

const ChatRoomListDiv = styled.div`
    display:flex;
    flex-direction: column;
    margin-top: 10px;
    margin-left: 5px;
    width: 90%;
    // height: 320px;
    border: 1px solid #cbcbcb;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 20px -6px;
    background: #f4f7ff99;
    padding: 10px 0px 10px 10px;
    height: 200px;
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
`

export default ChatroomList
