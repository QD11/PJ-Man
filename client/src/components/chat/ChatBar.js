import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import CreateRoom from './CreateRoom'
import MessageBox from './MessageBox'
import ChatroomList from './ChatroomList'
import { ActionCableContext } from '../../index'
import {useSelector} from 'react-redux'

const ChatBar = () => {
    const cable = useContext(ActionCableContext)
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
                console.log(newChatroom)
                if (newChatroom.chat_members.find(chat_member => chat_member.team_user.id === userTeamUser.id)){
                    setAllChatrooms(allChatrooms => [...allChatrooms, newChatroom])
                }
            }
        })
        setChannel(channel)

        // allChatrooms.forEach(chatroom => {
        //     cable.subscriptions.create({
        //         channel: "MessagesChannel",
        //         chatroom_id: chatroom.id
        //     },
        //     {
        //         received: (newMessage) => {
        //             setAllChatrooms(allChatrooms => allChatrooms.map(chatroom => {
        //                 if (chatroom.id === currentChatroom.id) {
        //                     return ({
        //                         ...chatroom,
        //                         last_message: newMessage
        //                     })
        //                 }
        //                 else {
        //                     return ({
        //                         ...chatroom
        //                     })
        //                 }
        //             }))
        //             setAllChatrooms(allChatrooms => allChatrooms.filter((v,i,a)=>a.findIndex(t=>(t.id===v.id))===i))
        //         }
        //     }
        //     )
        // })
        // return () => {
        //     channel.unsubscribe()
        // }
    }, [team]);
    
    const currentChatroom = currentReceiver ? allChatrooms.find(chatroom => chatroom.chat_members.some(chat_member => chat_member.team_user.id === currentReceiver.id)) : null
    
    return (
        <ChatDiv>
            {/* <BsChatRightDots onClick={() => setOpenSideBar(openSideBar => !openSideBar)} />
            {openSideBar &&  */}
                <div className="chat-div">
                    {/* <div className="add-div"><RiAddFill /></div> */}
                    <CreateRoom channel={channel} setCurrentReceiver={setCurrentReceiver} allChatrooms={allChatrooms}/>
                    <ChatroomList allChatrooms={allChatrooms} setCurrentReceiver={setCurrentReceiver} setAllChatrooms={setAllChatrooms}/>
                    {currentChatroom && <MessageBox setAllChatrooms={setAllChatrooms} userTeamUser={userTeamUser} currentReceiver={currentReceiver} currentChatroom={currentChatroom}/>}
                </div>
            {/* } */}
        </ChatDiv>
    )
}

const ChatDiv = styled.div`
    right: 0;
    position: fixed;
    background: #fff;
    width: 20em;
    z-index: 2;
    // margin-top: 39.99px;

    .chat-div {
        // width: 300px;
        display: flex;
        flex-direction: column;
        height: 100vh;
    }
`

export default ChatBar
