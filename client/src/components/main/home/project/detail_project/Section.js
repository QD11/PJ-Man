import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import Avatar from 'react-avatar'
import { motion } from 'framer-motion'

const Section = ({section}) => {
    const navigate = useNavigate()
    
    return (
        <div>
            <h3>{section.name}</h3>
            {section.tasks.map(task => 
                <TaskDiv
                    whileHover={{scale: 1.03 }}
                    whileTap={{scale: 0.98}}
                    name="task-div" 
                    completed={task.completed} 
                    onClick={() => navigate(`${section.id}/${task.id}`)} 
                    key={task.id}
                >
                    <div className="name-complete">
                        <h4>{task.name}</h4>
                        <h4>{task.completed ? "Completed" : "Not Completed"}</h4>
                    </div>
                    <div className="avatar-assigned-to">
                        <label>Assigned to: </label>
                        {/* {task.users.map(user => <span key={user.id}>{user.first_name} {user.last_name}</span>)} */}
                        {task.users.map(user => <Avatar key={user.id} name={user.first_name + " " + user.last_name} round={true} size="25" textSizeRatio={1} />)}
                    </div>
                </TaskDiv>
            )}
        </div>
    )
}

const TaskDiv = styled(motion.div)`
    border: 2px solid #e2d9d5;
    cursor: pointer;
    margin-bottom: 10px;
    margin-left: 2em;
    margin-right: 2em;
    border-radius: 5px;
    background-color: ${props => props.completed ? "#94f0ff" : "#e43737ad" };
    animation-duration: 0.2s;
    .name-complete {
        display: flex;
        justify-content: space-between;
        margin: 0 30px 0 20px;
    }
    .avatar-assigned-to {
        margin-left: 1em;
        margin-bottom: 5px;
    }
    &:hover {
        box-shadow: 0 0px 10px -6px rgba(0,0,0,0.7);
    }
`

export default Section
