import React from 'react'
import ChatroomItem from './ChatroomItem'
import styled from 'styled-components'

const ChatroomList = ({allChatrooms, setCurrentReceiver}) => {
    return (
        <ChatRoomListDiv>
            {allChatrooms.map(chatroom => <ChatroomItem key={chatroom.id} chatroom={chatroom} setCurrentReceiver={setCurrentReceiver}/>)}
        </ChatRoomListDiv>
    )
}

const ChatRoomListDiv = styled.div`
    min-height: 219px;
    overflow-y: scroll;
`

export default ChatroomList
