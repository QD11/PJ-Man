import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

const Section = ({section}) => {
    const navigate = useNavigate()
    
    return (
        <div>
            <h4>{section.name}</h4>
            {section.tasks.map(task => 
                <TaskDiv onClick={() => navigate(`${section.id}/${task.id}`)} key={task.id}>
                    <h6>{task.name}</h6>
                    <h6>{task.completed ? "Completed" : "Not Completed"}</h6>
                    {task.users.map(user => <span key={user.id}>{user.first_name} {user.last_name}</span>)}
                </TaskDiv>
            )}
        </div>
    )
}

const TaskDiv = styled.div`
    border: 1px solid black;
    cursor: pointer;
    margin-bottom: 10px;
`

export default Section
