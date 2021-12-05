import React, {useState} from 'react'
import styled from 'styled-components'
import {BsChatRightDots} from 'react-icons/bs'

const ChatBar = () => {
    const [openSideBar, setOpenSideBar] = useState(false)
    return (
        <ChatDiv>
            <BsChatRightDots onClick={() => setOpenSideBar(openSideBar => !openSideBar)} />
            {openSideBar && 
                <div>
                    some lsit
                </div>}
        </ChatDiv>
    )
}

const ChatDiv = styled.div`
    right: 0;
    position: fixed;
    background: white;
`

export default ChatBar
