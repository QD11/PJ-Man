import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Avatar from 'react-avatar'
import {getAllProjects} from '../../../../../redux/projectSlice'
import { getTeam } from '../../../../../redux/teamSlice'
import styled from 'styled-components'

const Task = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const taskInfo = useSelector(state => state.team).projects.find(project => project.id === parseInt(params.project_id)).sections.find(section => section.id === parseInt(params.section_id)).tasks.find(task => task.id === parseInt(params.task_id))

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
                <div>
                    <label>Assigned To: </label>
                    {taskInfo.team_users.map(team_user => <Avatar key={team_user.id} name={team_user.user.first_name + ' ' +  team_user.user.last_name} round={true} size="20" textSizeRatio={1.75}/>)}
                </div>
                <div>
                    <label for="status" >Status: </label>
                    <select id="status" defaultValue={taskInfo.completed} onChange={handleStatusChange}>
                        <option value={false} >Not Completed</option>
                        <option value={true}>Completed</option>
                    </select>
                </div>
            </div>
            <div className="description-div">
                <span>{taskInfo.description}</span>
            </div>
        </TaskDiv>
    )
}

const TaskDiv = styled.div`
    margin-top: 2em;
    border: 2px solid #e2d9d5;
    padding: 1em;
    width: 50em;
    display: flex;
    flex-direction: column;
    h2 {
        display: flex;
        justify-content: center
    }
    .status-assign {
        display: flex;
        justify-content: space-between;
    }
    .description-div {
        width: 80;
        border: 2px solid #e2d9d5;
        display: flex;
        flex-wrap: wrap;
        margin: 5px;
        padding: 5px;
        background-color: white;
    }
`

export default Task
