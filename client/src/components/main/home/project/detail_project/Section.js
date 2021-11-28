import React from 'react'
import styled from 'styled-components'
import {useNavigate, Route, Routes} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Section = ({section, project}) => {
    const navigate = useNavigate()
    const team = useSelector(state => state.team)
    
    return (
        <div>
            <h4>{section.name}</h4>
            {section.tasks.map(task => 
                <TaskDiv onClick={() => navigate(`${section.name}/${task.name}`)}>
                    <h6>{task.name}</h6>
                    <h6>{task.completed ? "Completed" : "Not Completed"}</h6>
                    {task.users.map(user => <span>{user.first_name} {user.last_name}</span>)}
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