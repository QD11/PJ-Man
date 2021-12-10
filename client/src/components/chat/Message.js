import React from 'react'
import styled from 'styled-components'
import { parseISO } from 'date-fns'
import Avatar from 'react-avatar';

const Message = ({message, teamUser}) => {
    const content = message.message
    const messageDate = message.created_at
    const messageDateFormatted = parseISO(messageDate)
    const currentDateTime = (new Date()).toLocaleString();
    const curDateTime = currentDateTime.split(", ")
    const messageDateTime = messageDateFormatted.toLocaleString() // 11/17/2021, 6:31:47 PM
    const msgDateTime = messageDateTime.split(", ")
    const renderDate = curDateTime[0] === msgDateTime[0] ? msgDateTime[1] : msgDateTime[0]

    return (
        <>
            {message.team_user.id === teamUser.id ? 
            <UserDiv>
                <MessageDiv>
                    <UserSpan>{content}</UserSpan>
                    <DateSpan>{renderDate}</DateSpan>
                </MessageDiv>
                <AvatarDiv>
                    <Avatar src={message.team_user.user.profile_picture_url} name={message.team_user.user.first_name + ' ' +  message.team_user.user.last_name} round={true} size="45" textSizeRatio={1.75}/>
                </AvatarDiv>
            </UserDiv>
            :
            <OtherDiv>
                <AvatarDiv>
                    <Avatar src={message.team_user.user.profile_picture_url} name={message.team_user.user.first_name + ' ' +  message.team_user.user.last_name} round={true} size="45" textSizeRatio={1.75}/>
                </AvatarDiv>
                <OtherMessageDiv>
                    <OtherSpan>{content} </OtherSpan>
                    <OtherDateSpan>{renderDate}</OtherDateSpan>
                </OtherMessageDiv>
            </OtherDiv>}
        </>
    )
}

const AvatarDiv = styled.div`
    margin-bottom: -10px;
`

const UserDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 10px;
`
const MessageDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-right:4px;
`

const OtherDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 10px;
`
const OtherMessageDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-left:4px;
`

const DateSpan = styled.span`
    font-size: 10px;
    display: flex;
    justify-content: flex-end;
`

const OtherDateSpan = styled.span`
    font-size: 10px;
    display: flex;
    justify-content: flex-start;
`

const UserSpan = styled.span`
    display: flex;
    justify-content: flex-end;
    margin: 5px 0 5px;
    padding: 0.5em 1em 0.65em;
    border-radius: 4px;
    font-size: 20px;
    max-width: 500px;
    clear: both;
    position: relative;
    float: right;
    background-color: #1289fe;
    color: white;
    border-top-left-radius: 1.1em;
    border-top-right-radius: 1.1em;
    border-bottom-right-radius: 1em 0.2em;
    border-bottom-left-radius: 1.1em;
`

const OtherSpan = styled.p`
    display: flex;
    justify-content: flex-end;
    margin: 0 0 5px;
    padding: 0.5em 1em 0.65em;
    border-radius: 4px;   
    //max-width: 65%;
    font-size: 20px;
    clear: both;
    position: relative;
    float: left;
    background-color: #e5e5ea;
    color: black;
    border-top-left-radius: 1.1em;
    border-top-right-radius: 1.1em;
    border-bottom-left-radius: 1em 0.2em;
    border-bottom-right-radius: 1.1em;
    max-width: 500px;
`

export default Message
