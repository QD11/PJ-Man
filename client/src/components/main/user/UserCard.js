import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam } from '../../../redux/teamSlice'

const UserCard = ({user, team_user}) => {
    //userInfo points to logged in user
    //user refers to the card owner
    const dispatch = useDispatch()
    const [titleInput, setTitleInput] = useState(false)
    const team = useSelector(state => state.team)
    const [title, setTitle] = useState('')
    
    useEffect(() => {
        setTitle('')
    }, [titleInput])

    const onTitleHandler = () => {
        fetch(`/change_title/${team_user.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                team_id: team.id,
                title:  title ? title : null,
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => {
                    dispatch(getTeam(data))
                    setTitleInput(false)
                })
            }
        })
    }

    return (
        <div>
            <CardDiv>
                <div className="top-half">
                    <div>
                        <div className="name-admin" >
                            <h3>{user.first_name + " " + user.last_name}</h3>
                            <AdminStatus admin={team_user.admin} >{team_user.admin ? "Admin" : "Member" }</AdminStatus>
                            {team_user.owner && <OwnerStatus >Owner</OwnerStatus> }
                        </div>
                        <TitleDiv className="role">
                            {titleInput ? 
                            <> 
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                                <button onClick={onTitleHandler}> Submit </button>
                            </>
                            : 
                            <p>{team_user.title ? team_user.title : "---"}</p>}
                        </TitleDiv>
                        <div>
                            <button onClick={() => setTitleInput(titleInput => !titleInput)}>Change Title</button>
                        </div>
                    </div>
                    <div>
                        <Avatar key={user.id} name={user.first_name + ' ' +  user.last_name} round={true} size="75" textSizeRatio={1.75}/>
                    </div>
                </div>
            </CardDiv>
        </div>
    )
}

const TitleDiv = styled.div`
    height: 35px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    & button {
        margin-left: 5px;
        // margin-block-start: 1em;
        // margin-block-end: 1em;
    }
`

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
    
    .content {
        display: flex;
    }

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
        font-size: 1rem;
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


export default UserCard
