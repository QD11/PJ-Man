import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Avatar from 'react-avatar'
import {getAllProjects} from '../../../../../redux/projectSlice'
import { getTeam } from '../../../../../redux/teamSlice'
import styled from 'styled-components'
import { useEffect } from 'react/cjs/react.development'
import TaskMessage from './TaskMessage'

const Task = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const taskInfo = useSelector(state => state.team).projects.find(project => project.id === parseInt(params.project_id)).sections.find(section => section.id === parseInt(params.section_id)).tasks.find(task => task.id === parseInt(params.task_id))
    const user = useSelector(state => state.user)
    const teamUser = team.team_users.find(team_user => team_user.user_id === user.id)
    const [messages, setMessages] = useState([])
    
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

    return (
        <TaskDiv>
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
                <div>
                    <label >Status: </label>
                    <select id="status" defaultValue={taskInfo.completed} onChange={handleStatusChange}>
                        <option value={false} >Not Completed</option>
                        <option value={true}>Completed</option>
                    </select>
                </div>
            </div>
            <div className="description-div">
                <span>Description</span>
                <span className="description-span">
                    {taskInfo.description}
                </span>
            </div>
            <div className="task-message-div">
                {/* {messages.map(message => <span>{message.message}</span>)} */}
                {messages.map(message => <TaskMessage key={message.id} teamUser={teamUser} message={message}/>)}
            </div>
        </TaskDiv>
    )
}

const TaskDiv = styled.div`
    margin-top: 2em;
    border: 1px solid #e2d9d5;
    border-radius: 20px;
    background-color: #fff;
    padding: 2em;
    width: 50em;
    display: flex;
    flex-direction: column;
    h2 {
        display: flex;
        justify-content: center;
        font-size: 40px;
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
            width: 80;
            border: 2px solid #e2d9d5;
            display: flex;
            flex-wrap: wrap;
            // margin: 5px;
            padding: 5px;
            background-color: white;
            overflow-y: scroll;
            height: 100px;
            
        }
    }
`

export default Task
