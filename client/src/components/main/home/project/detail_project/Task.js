import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import Avatar from 'react-avatar'
import {getAllProjects} from '../../../../../redux/projectSlice'

const Task = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const taskInfo = useSelector(state => state.projects).find(project => project.id === parseInt(params.project_id)).sections.find(section => section.id === parseInt(params.section_id)).tasks.find(task => task.id === parseInt(params.task_id))

    const handleStatusChange = (e) => {
        fetch(`/${taskInfo.id}/status_update`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"
            },
            body: JSON.stringify({completed: e.target.value, team_id: team.id}) 
        })
        .then(resp => resp.json())
        .then(data => dispatch(getAllProjects(data))
        //add error
            // dispatch(updateTaskStatus([{
            //     ...data},
            //     {project_name: params.project, section_name: params.section}
            // ]))
        )
    }

    return (
        <div>
            <h2>{taskInfo.name}</h2>
            <label for="status" >Status: </label>
            <select id="status" defaultValue={taskInfo.completed} onChange={handleStatusChange}>
                <option value={false} >Not Completed</option>
                <option value={true}>Completed</option>
            </select>
            <div>
                <span>{taskInfo.description}</span>
            </div>
            <div>
                <label>Assigned To: </label>
            </div>
            <div>
                {taskInfo.users.map(user => <Avatar key={user.id} name={user.first_name + ' ' +  user.last_name} round={true} size="20" textSizeRatio={1.75}/>)}
            </div>
        </div>
    )
}

export default Task
