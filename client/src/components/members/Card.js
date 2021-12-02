import React from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import {RiMessage3Line, RiArrowUpCircleLine, RiArrowDownCircleLine, RiUserUnfollowFill} from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { fetchTeam, getTeam } from '../../redux/teamSlice'
import { getAllProjects } from '../../redux/projectSlice'

const Card = ({user, team_user, userInfo, teamUserCurrentInfo, showRemove}) => {
    //userInfo points to logged in user
    //user refers to the card owner
    const dispatch = useDispatch()
    const changeAdminHandler = () => {
        const currentAdmin = team_user.admin
        const team_id = teamUserCurrentInfo.team_id

        fetch(`/change_admin/${team_user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                team_id: team_id,
                admin: !currentAdmin,
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => dispatch(getTeam(data)))
            }
    })}

    const removeUser = () => {
        fetch(`/${teamUserCurrentInfo.team_id}/team_users/${team_user.id}`, {
            method: "DELETE",
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => {
                    // dispatch
                    dispatch(getTeam(data))
                    // dispatch(fetchTeam(`/teams/${teamUserCurrentInfo.team_id}`))
                    // dispatch(removeMemberFromTeam({user_id: user.id}))
                })
            }
    })}

    return (
        <CardDiv>
            <div className="top-half">
                <div>
                    <div className="name-admin" >
                        <h3>{user.first_name + " " + user.last_name}</h3>
                        <AdminStatus admin={team_user.admin} >{team_user.admin ? "Admin" : "Member" }</AdminStatus>
                        {team_user.owner && <OwnerStatus >Owner</OwnerStatus> }
                    </div>
                    <p>{team_user.title ? team_user.title : "---"}</p>
                </div>
                <div className="remove-user-div">
                    {showRemove && < RiUserUnfollowFill onClick={removeUser} />}
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
                {!team_user.owner && teamUserCurrentInfo.admin &&
                    <ProDemDiv onClick={changeAdminHandler}>
                        {team_user.admin ? 
                        <div>
                            <RiArrowDownCircleLine  />
                            <span >Demote</span> 
                        </div>
                        : 
                        <div>
                            <RiArrowUpCircleLine  />
                            <span >Promote</span> 
                        </div>
                        }
                    </ProDemDiv>
                }
            </div>}
        </CardDiv>
    )
}

const OwnerStatus = styled.span`
    display: inline-block;
    color: red;
    background-color: #f1e3e7;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 500;
    margin-left: .75rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`

const AdminStatus = styled.span`
    display: inline-block;
    color: ${props => props.admin ? "green" : "purple"};
    background-color: ${props => props.admin ? "#e3f1f0": "#f7ecf6"};
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 500;
    margin-left: .75rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`

const CardDiv = styled.div`
    align-items:center;
    border-radius: 5px;
    border: 1px solid #e2e8f0;
    margin-top: 40px;
    // height: 141px;
    width: 600px;
    background-color: #fff;
    font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    
    .remove-user-div {
        display: flex;
        align-items: center;
        font-size: 50px;
        color: red;
        width: fit-content;
        height: fit-content;
        margin-top: 10px;
        cursor: pointer;
    }

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
    }

    .bottom-half {
        display: flex;
        // padding: 20px 0 20px 0;
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
            width: 50%;
            text-align: center;
            height: 100%;
            padding: 20px 0 20px 0;
            & span {
                margin-left: 10px;
                color: #183063;
            }
        }
    }
`


const ProDemDiv = styled.div`
    cursor: pointer;
    border-width: 1;
    border-style: solid;
    border-color: #e2e8f0;
    border-left-width: 1px;
    border-top-width: 0px;
    border-bottom-width: 0px;
    border-right-width: 0px;
    color: #183063;
    font-size: 20px;
    text-align: center;
    width: 50%;
    height: 100%;
    padding: 20px 0 20px 0;
    & span {
        margin-left: 10px;
    }
`


export default Card
