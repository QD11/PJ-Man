import React from 'react'
import ChatroomItem from './ChatroomItem'
import styled from 'styled-components'

const ChatroomList = ({allChatrooms, setCurrentReceiver, setAllChatrooms}) => {

    const sortedChatrooms = allChatrooms.sort(function(a,b) {
        return new Date(b.last_message.created_at) - new Date(a.last_message.created_at)
    })
    console.log(allChatrooms)
    return (
        <ChatRoomListDiv>
            {sortedChatrooms.map(chatroom => <ChatroomItem key={chatroom.id} setAllChatrooms={setAllChatrooms} chatroom={chatroom} setCurrentReceiver={setCurrentReceiver}/>)}
        </ChatRoomListDiv>
    )
}

const ChatRoomListDiv = styled.div`
    min-height: 219px;
    overflow-y: scroll;
`

export default ChatroomList
