import React, {useEffect, useState} from 'react'
import UserCard from './UserCard'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RiArrowRightSFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import CloudinaryUpload from './CloudinaryUpload'
import { getUser } from '../../../redux/userSlice'

const User = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const team = useSelector(state => state.team)
    const team_user = team.team_users.find(team_user => team_user.user_id === user.id)
    const [tasks, setTasks] = useState([])
    // const team = useSelector(state => state.team).projects

    //fetch tasks that belong to user
    useEffect(() => {
        fetch(`/${team_user.id}/tasks`)
        .then(resp => resp.json())
        .then(data => setTasks(data))
    }, [])
    
    return (
        <UserDiv>
            <UserCard user={user} team_user={team_user} />
            <div className="tasks-div">
                <h2>Your Tasks</h2>
                <TaskUL>
                    {tasks.map(task => {
                        return(
                        <TaskDiv key={task.id} onClick={() => navigate(`/${team.name}/project/${task.section.project.id}/${task.section.id}/${task.id}`)}>
                            <div className="task">
                                <span>{task.name}</span>
                            </div>
                            <div className="section-project">
                                <span className="project">{task.section.project.name}</span>
                                <RiArrowRightSFill />
                                <span className="section">{task.section.name}</span>
                                <RiArrowRightSFill />
                                <span>{task.name}</span>
                            </div>
                        </TaskDiv>
                    )})}
                </TaskUL>
            </div>
        </UserDiv>
    )
}

const TaskUL = styled.ul`
margin-block-start: 0em;
margin-block-end: 0em;
padding-inline-start: 0em;
&: last-child {
    margin-bottom: 40px;
}
`

const TaskDiv = styled.li`
    list-style: none;
    align-items:center;
    border-radius: 5px;
    border: 1px solid #e2e8f0;
    margin-top: 40px;
    // height: 141px;
    padding: 2em;
    width: 600px;
    background-color: #fff;
    font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    .task {
        font-size: 25px;
        margin-bottom: 10px;
    }
    .project {
        // min-width: 350px;
        // display: inline-block;
    }
    .tasks-div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`

const UserDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`



export default User
