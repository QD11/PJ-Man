import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { getTeam, fetchTeam } from '../../../redux/teamSlice'
import { getUser } from '../../../redux/userSlice'
// import CloudinaryUpload from './CloudinaryUpload'
import {BsFillPencilFill} from 'react-icons/bs'

const UserCard = ({user, team_user}) => {
    //userInfo points to logged in user
    //user refers to the card owner
    const dispatch = useDispatch()
    const [titleInput, setTitleInput] = useState(false)
    const team = useSelector(state => state.team)
    const [title, setTitle] = useState('')
    const [changeTitle, setChangeTitle] = useState(false)
    
    useEffect(() => {
        setTitle(user.title)
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
                    setChangeTitle(false)
                    setTitleInput(false)
                })
            }
        })
    }

    const handleUpload = (result) => {
        const body = {
            profile_picture_url: result.info.secure_url,
            profile_picture_thumbnail_url: result.info.eager[0].secure_url,
            cloudinary_public_id: result.info.public_id,
            // team_id: team.id
        }
        fetch(`/pictures/${user.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(user => {
            dispatch(getUser(user));
            dispatch(fetchTeam(`/teams/${team.id}`))
        })
    }
    
    const removePicture = () => {
        fetch('/remove_picture', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(user => {
            dispatch(getUser(user));
            dispatch(fetchTeam(`/teams/${team.id}`))
        }) 
    }
    
    return (
        <div>
            {/* <CardDiv>
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
                            <div>
                                <CloudinaryUpload
                                    preset="k3o6vpxz"
                                    buttonText="Update Picture"
                                    handleUpload={handleUpload}
                                /> 
                                <button onClick={removePicture}>Remove Picture</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Avatar src={user.profile_picture_url} name={user.first_name + ' ' +  user.last_name} round={true} size="75" textSizeRatio={1.75}/>
                    </div>
                </div>
            </CardDiv> */}
            {/*  */}
            <CardDIV>
                <div className="header">
                    <div>
                        <AdminStatus admin={team_user.admin} >{team_user.admin ? "Admin" : "Member" }</AdminStatus>
                        {/* <AdminIcon /> */}
                        {team_user.owner && <OwnerStatus >Owner</OwnerStatus> }
                    </div>
                    <AvatarDiv className="avatar-div">
                        <Avatar key={user.id}  src={user.profile_picture_url} name={user.first_name + ' ' +  user.last_name} round={true} size="120" textSizeRatio={1.75}/>
                    </AvatarDiv>
                    <div className="changePic">
                        {/* <CloudinaryUpload
                            preset="k3o6vpxz"
                            buttonText="Update Picture"
                            handleUpload={handleUpload}
                        /> */}
                        <button onClick={removePicture}>Remove Picture</button>
                    </div> 
                    <div className="name-admin" >
                        <span className="name">{user.first_name + " " + user.last_name}</span>
                        <div className="title-div">
                            {changeTitle ?
                                <>
                                    <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                                    < ChangeTitle onClick={onTitleHandler}/>
                                </>
                                    :
                                <>
                                    <span className="title">{team_user.title ? team_user.title : "---"}</span>
                                    < ChangeTitle onClick={() => setChangeTitle(true)}/>
                                </>
                            }
                        </div>
                        <span className="email">{user.email}</span>
                    </div>
                </div>
            </CardDIV>
        </div>
    )
}

const ChangeTitle = styled(BsFillPencilFill)`
    margin-left: 10px;
`

const CardDIV = styled.div`
    margin-top: 40px;
    display: flex;
    border-radius: 20px;
    height: fit-content;
    width: 250px;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 20%);
    .header {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
    }
    .changePic {
        display: flex;
        margin-top: 20px;
        justify-content: center;
    }
    .name-admin {
        display: flex;
        align-items: center;
        flex-direction: column;
        & span {
            margin-top: 10px;
            font-size: 18px;
        }
        .title-div {
            margin-top: 10px;
        }
        .name {
            font-size: 28px;
            font-weight: 500;
            text-align: center;
        }
        .email {
            color: gray;
            // font-weight: 600;
        }
    }
    .message-admin {
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        justify-content: space-around;
        font-size: 20px;
        .msg {
            display: flex;
            align-items: center;
        }
        .adm {
            display: flex;
            cursor: pointer;
            // color: #183063;
            text-align: center;
            width:fit-content;
            height: 100%;
            // padding: 20px 0 20px 0;
            & span {
                // margin-left: 10px;
            }
            .admin-btn {
                width: fit-content;
                display: flex;
            }
        }
    }
`

const AvatarDiv = styled.div`
    border-radius: 0 40px 40px 0;
    width: 100%;
    margin-top: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`

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
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 20%);
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

// text-decoration: none;
// color: black;
// border: 0.5px solid #717171;
// font-size: 13px;
// margin-left: 5px;
// margin-right: 5px;
// background-color: #efefef;
// padding: 2px;
// border-radius: 2px;


export default UserCard
