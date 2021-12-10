import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Avatar from 'react-avatar'
import {getAllProjects} from '../../../../../redux/projectSlice'
import { getTeam } from '../../../../../redux/teamSlice'
import styled from 'styled-components'
import TaskMessage from './TaskMessage'
import TaskToggle from './TaskToggle'

const Task = () => {
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const taskInfo = team.projects.find(project => project.id === parseInt(params.project_id)).sections.find(section => section.id === parseInt(params.section_id)).tasks.find(task => task.id === parseInt(params.task_id))
    const project = team.projects.find(project => project.id === parseInt(params.project_id))
    const user = useSelector(state => state.user)
    const teamUser = team.team_users.find(team_user => team_user.user_id === user.id)
    const [messages, setMessages] = useState([])
    const [inputMsg, setInputMsg] = useState("")
    
    useEffect(() => {
        fetch(`/tasks/${taskInfo.id}/task_messages`)
        .then(resp => resp.json())
        .then(data => setMessages(data))
    }, [])

    const handleStatusChange = (e) => {
        fetch(`/${taskInfo.id}/status_update`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"
            },
            body: JSON.stringify({completed: e.target.value, team_id: team.id}) 
        })
        .then(resp => resp.json())
        .then(data => dispatch(getTeam(data))
        //add error
            // dispatch(updateTaskStatus([{
            //     ...data},
            //     {project_name: params.project, section_name: params.section}
            // ]))
        )
    }

    const handleUploadMessage = (e) => {
        e.preventDefault()
        fetch('/task_messages', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                task_id: taskInfo.id,
                team_user_id: teamUser.id,
                message: inputMsg,
            })
        })
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(messages => {
                    setMessages(messages)
                    setInputMsg("")
                })
            }
        })
    }
    return (
        <TaskDiv priority={project.priority}>
            <div className="header">
            <GoBack priority={project.priority} onClick={() => navigate(`/${params.team}/project/${params.project_id}/`)}>Back</GoBack>
            <TaskToggle taskInfo={taskInfo} />
            </div>
            <h2>{taskInfo.name}</h2>
            <div className="status-assign">
                <div className="assign-div">
                    <label>Assigned To</label>
                    <ul>
                        {taskInfo.team_users.map(team_user => 
                            <li>
                                <Avatar key={team_user.id} src={team_user.user.profile_picture_url} name={team_user.user.first_name + ' ' +  team_user.user.last_name} round={true} size="60" textSizeRatio={1.75}/>
                            </li>
                            )}
                    </ul>
                </div>
                <div className="assign-div">
                    <label>Due By: </label>
                    <span>{taskInfo.due_date.slice(5,10)+'-'+taskInfo.due_date.slice(0,4)}</span>
                </div>
                <div>
                    {/* <label >Status: </label>
                    <select id="status" defaultValue={taskInfo.completed} onChange={handleStatusChange}>
                        <option value={false} >Not Completed</option>
                        <option value={true}>Completed</option>
                    </select> */}
                </div>
            </div>
            <div className="description-div">
                <span>Description</span>
                <span className="description-span">
                    {taskInfo.description}
                </span>
            </div>
            <TaskMessageDiv>
                {/* {messages.map(message => <span>{message.message}</span>)} */}
                <div className="messageDiv">
                    {messages.map(message => <TaskMessage key={message.id} teamUser={teamUser} message={message}/>)}
                </div>
                <div className="messageForm">
                    <form className="grouping" onSubmit={handleUploadMessage}>
                        <input value={inputMsg} type="text" onChange={ e => setInputMsg(e.target.value)} ></input>
                        <SubmitBtn priority={project.priority} disabled={!inputMsg} >Submit</SubmitBtn>
                    </form>
                </div>
            </TaskMessageDiv>
        </TaskDiv>
    )
}



const SubmitBtn = styled.button`
    // width: fit-content;
    border: 0;
    outline: 0;
    cursor: pointer;
    // color: rgb(60, 66, 87);
    color: black;
    // background-color: rgb(255, 255, 255);
    background-color: #f4f6f8;
    // box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
    box-shadow: -5px 5px 0px ${props => props.priority === "low" ? "#93d36b" : props.priority === "medium"? "#6ac9f4": "#f0ada8"};
    border-radius: 4px;
    font-size: 20px;
    font-weight: 500;
    padding: 4px 8px;
    display: inline-block;
    min-height: 28px;
    transition: background-color .24s,box-shadow .24s;
    margin: 10px;
    margin-bottom: 22px;
    // &:hover {
    //     // background-color: #253858;
    //     //     color: #fff;
    //     box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 3px 9px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
    // }
    &:active {
        box-shadow: none;
        transform: translate(-2px, 2px);
    }
    &:disabled {
        background-color: #d3d3d3;
        box-shadow: none;
        transform: translate(-2px, 2px);
    }
`

const GoBack = styled.button`
    // width: fit-content;
    border: 0;
    outline: 0;
    cursor: pointer;
    // color: rgb(60, 66, 87);
    color: black;
    // background-color: rgb(255, 255, 255);
    background-color: #ebecee;
    // box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
    box-shadow: -5px 5px 0px ${props => props.priority === "low" ? "#93d36b" : props.priority === "medium"? "#6ac9f4": "#f0ada8"};
    border-radius: 4px;
    font-size: 20px;
    font-weight: 500;
    padding: 4px 8px;
    display: inline-block;
    min-height: 28px;
    transition: background-color .24s,box-shadow .24s;
    margin: 10px;
    // &:hover {
    //     // background-color: #253858;
    //     //     color: #fff;
    //     box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 3px 9px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
    // }
    &:active {
        box-shadow: none;
        transform: translate(-2px, 2px);
    }
`

const TaskMessageDiv = styled.div`
    margin-top: 20px;
    height: 500px;
    border: 1px solid #cbcbcb;
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 20%);
    border-radius: 20px;
    background: #f4f7ff99;
    .messageForm {
        width: 100%;
        // height: 20%;
        box-sizing: border-box;
        border-width: 1;
        border-style: solid;
        border-color: #cbcbcb;
        border-left-width: 0px;
        border-top-width: 1px;
        border-bottom-width: 0px;
        border-right-width: 0px;
        display: flex;
        align-items: center;
        .grouping { 
            display: flex;
            width: 100%;
            margin-top: 15px;
            justify-content: space-around;
            align-items: center;

        }
        & input {
            width: 78%;
            height: 40px;
            font-size: 25px;
            margin-left: 20px;
            
            padding: 7px;
            border-radius: 6px;
            // font-size: 16px;
            background: #fbfbfb;
            border: 2px solid transparent;
            height: 36px;
            box-shadow: 0 0 0 1px #dddddd, 0 2px 4px 0 rgb(0 0 0 / 7%), 0 1px 1.5px 0 rgb(0 0 0 / 5%);
            :focus{
                border: 2px solid #000;
                border-radius: 4px;
            }
        
        }
        & button {
            height: 46px;
        }
    }
    .messageDiv {
        height: 80%;
        max-height: 80%;
        min-height: 80%;
        overflow-y: scroll;
        &::-webkit-scrollbar { 
            width:12px;
            }
        &::-webkit-scrollbar-thumb {
            margin-top: 5px;
            border-radius: 10px;
            background: #1289fe; 
            }
        &::-webkit-scrollbar-track-piece {
            margin-top: 15px;
    }
`

const TaskDiv = styled.div`
    // box-shadow: 0 0px 20px -6px rgb(0 0 0 / 30%);
    box-shadow: -8px 8px 0px 3px ${props => props.priority === "low" ? "#93d36b" : props.priority === "medium"? "#6ac9f4": "#f0ada8"};
    // margin-top: 2em;
    margin-bottom: 80px;
    border: 1px solid #e2d9d5;
    border-radius: 20px;
    background-color: #fff;
    padding: 40px;
    width: 85%;
    display: flex;
    flex-direction: column;
    h2 {
        display: flex;
        justify-content: center;
        font-size: 40px;
    }
    .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .status-assign {
        display: flex;
        justify-content: space-between;
        .assign-div {
            & label {
                text-decoration:underline;
                font-size: 25px;
            }
            display: flex;
            flex-direction: column;
            & span {
                margin-top: 25px;
                font-size: 25px;
            }
        }
        & ul {
            display: flex;
            flex-wrap: wrap;
            margin-block-start: 0em;
            margin-block-end: 0em;
            margin-inline-start: 0px;
            margin-inline-end: 0px;
            padding-inline-start: 0px;
            width: 600px;
            & li {
                list-style: none;
                margin-right: 10px;
                margin-top: 1em;
                margin-bot: 1em;
                :nth-child(8n) {
                    margin-right: 0px;
                }
            }
        }
    }
    .description-div {
        margin-top: 20px;
        .description-span {
            margin-top: 10px;
            box-shadow: 0 0px 20px -6px rgb(0 0 0 / 20%);
            width: 80;
            border-radius: 20px;
            border: 2px solid #e2d9d5;
            display: flex;
            flex-wrap: wrap;
            // margin: 5px;
            padding: 15px;
            background-color: white;
            overflow-y: hidden;
            height: 80px;
            
        }

    }
`

export default Task
