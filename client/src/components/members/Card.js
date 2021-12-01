import React from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import {RiMessage3Line} from 'react-icons/ri'

const Card = ({user, team_user, userInfo}) => {

    return (
        <CardDiv>
            <div className="top-half">
                <div>
                    <div className="name-admin">
                        <h3>{user.first_name + " " + user.last_name}</h3>
                        <span>{team_user.admin ? "Admin" : "Member" }</span>
                    </div>
                    <p>{team_user.title ? team_user.title : "---"}</p>
                </div>
                <div>
                <Avatar key={user.id} name={user.first_name + ' ' +  user.last_name} round={true} size="75" textSizeRatio={1.75}/>
                </div>
            </div>
            {userInfo.id !== user.id && <div className="bottom-half">
                <div className="Message">
                    < RiMessage3Line />
                    <span>Message</span>
                </div>
            </div>}
        </CardDiv>
    )
}

const CardDiv = styled.div`
    align-items:center;
    border-radius: 5px;
    border: 1px solid #e2e8f0;
    // height: 141px;
    width: 370px;
    background-color: #fff;
    font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    
    .top-half {
        display: flex;
        justify-content: space-between;
        padding: 1.5rem;
    }

    & h3 {
        // font-size: 0.875rem;
        font-size: 2rem;
        font-weight: 500;
        color: #183063;
        margin-block-start: 0em;
        margin-block-end: 0em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
    }

    & p {
        color: #8f9cb5;
        font-size: .875rem;
        margin-top: 0.25rem;
    }

    .name-admin {
        display: flex;
        align-items: center;
        & span {
            display: inline-block;
            color: green;
            background-color: #e3f1f0;
            border-radius: 9999px;
            font-size: 1rem;
            font-weight: 500;
            margin-left: .75rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;
        }
    }

    .bottom-half {
        display: flex;
        padding: 20px 0 20px 0;
        justify-content: space-around;
        box-sizing: border-box;
        border-width: 1;
        border-style: solid;
        border-color: #e2e8f0;
        border-top-width: 1px;
        border-bottom-width: 0px;
        border-right-width: 0px;
        border-left-width: 0px;
        align-items: center;
        .Message {
            font-size: 20px;
            & span {
                margin-left: 10px;
                color: #183063;
            }
        }
    }
`


export default Card
