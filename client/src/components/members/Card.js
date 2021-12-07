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

    const status = {
        owner: team_user.owner,
        admin: team_user.admin
    }

    return (
        <CardDiv>
            <div className="top-half">
                <div className="content-div">
                    <div>
                        <div>
                            <AdminStatus admin={team_user.admin} >{team_user.admin ? "Admin" : "Member" }</AdminStatus>
                            {team_user.owner && <OwnerStatus >Owner</OwnerStatus> }
                        </div>
                        <div className="name-admin" >
                            <h3>{user.first_name + " " + user.last_name}</h3>
                        </div>
                        <p>{team_user.title ? team_user.title : "---"}</p>
                    </div>
                    <div className="remove-user-div">
                        {showRemove && < RiUserUnfollowFill onClick={removeUser} />}
                    </div>
                {userInfo.id !== user.id && <div className="bottom-half">
                <div className="Message">
                    < RiMessage3Line />
                    <span>Message</span>
                </div>
                {!team_user.owner && teamUserCurrentInfo.admin &&
                    <ProDemDiv>
                        {team_user.admin ? 
                        <div onClick={changeAdminHandler} style={{width: "fit-content"}}>
                            <RiArrowDownCircleLine  />
                            <span >Demote</span> 
                        </div>
                        : 
                        <div onClick={changeAdminHandler} style={{width: "fit-content"}}>
                            <RiArrowUpCircleLine  />
                            <span >Promote</span> 
                        </div>
                        }
                    </ProDemDiv>
                }
            </div>}
                </div>
                <AvatarDiv status={status} className="avatar-div">
                    <Avatar key={user.id}  src={user.profile_picture_url} name={user.first_name + ' ' +  user.last_name} round={true} size="100" textSizeRatio={1.75}/>
                </AvatarDiv>
            </div>
            {/* {userInfo.id !== user.id && <div className="bottom-half">
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
            </div>} */}
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
const AvatarDiv = styled.div`
    border-radius: 0 40px 40px 0;
    width: 40%;
    display: flex;
    justify-content: center;
    background-color: ${props => props.status.owner ? "red" : props.status.admin ? "green" : "purple"};
    align-items: center;
`

const CardDiv = styled.div`
    // box-shadow: 0 0px 20px -6px rgb(0 0 0 / 20%);
    transition: all 0.5s ease-out;
    :hover {
        box-shadow: -10px 10px 0px 0px rgb(0 0 0 / 20%);
        transform: translate(5px, -5px);
        // translate-x: 10px;
    }
    align-items:center;
    border-radius: 40px;
    // border: 1px solid #e2e8f0;
    margin-top: 40px;
    // height: 141px;
    width: 500px;
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
        // padding: 1.5rem;
        .content-div {
            padding: 20px 0px 20px 20px;
            width: 60%;
        }
        // .avatar-div {
        //     border-radius: 0 40px 40px 0;
        //     width: 40%;
        //     display: flex;
        //     justify-content: center;
        //     background-color: red;
        //     align-items: center;
        // }
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
        font-size: 1.3rem;
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
        // border-width: 1;
        // border-style: solid;
        // border-color: #e2e8f0;
        // border-top-width: 1px;
        // border-bottom-width: 0px;
        // border-right-width: 0px;
        // border-left-width: 0px;
        align-items: center;
        .Message {
            font-size: 20px;
            width: 50%;
            text-align: center;
            height: 100%;
            // padding: 20px 0 20px 0;
            & span {
                margin-left: 10px;
                color: #183063;
            }
        }
    }
`


const ProDemDiv = styled.div`
    cursor: pointer;
    // border-width: 1;
    // border-style: solid;
    // border-color: #e2e8f0;
    // border-left-width: 1px;
    // border-top-width: 0px;
    // border-bottom-width: 0px;
    // border-right-width: 0px;
    color: #183063;
    font-size: 20px;
    text-align: center;
    width: 50%;
    height: 100%;
    // padding: 20px 0 20px 0;
    & span {
        margin-left: 10px;
    }
`


export default Card
