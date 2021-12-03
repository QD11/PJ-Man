import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import Avatar from 'react-avatar'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects } from '../../../../../redux/projectSlice'
import { getTeam } from '../../../../../redux/teamSlice'

const Section = ({section}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.isAdmin)
    const team = useSelector(state => state.team)

    const deleteHandler = (e, task) => {
        e.stopPropagation()
        fetch(`/tasks/${team.id}/${task.id}`, {
            method: "DELETE"
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => {
                    dispatch(getTeam(data))
                })
            } else {
                r.json().then((err) => console.log(err.errors));
            }})
    }
    
    return (
        <>
            <SectionDiv>
                <h4>{section.name}</h4>
                <TaskUl className="section-holder">
                    {section.tasks.map(task => 
                        <TaskLi>
                            <div className="top-div">
                            </div>
                            <div className="mid-div">
                                <span>{task.name}</span>
                                <span>{task.description}</span>
                            </div>
                            <div className="bottom-div">
                                
                            </div>
                        </TaskLi>
                        // <TaskDiv
                        //     // whileHover={{scale: 1.03 }}
                        //     //whileTap={{scale: 0.98}}
                        //     name="task-div" 
                        //     completed={task.completed} 
                        //     onClick={() => navigate(`${section.id}/${task.id}`)} 
                        //     key={task.id}
                        // >
                        //     <div className="name-complete">
                        //         <h4>{task.name}</h4>
                        //         <h4>{task.completed ? "Completed" : "Not Completed"}</h4>
                        //     </div>
                        //     <div className="avatar-assigned-to">
                        //         <div>
                        //             <label>Assigned to: </label>
                        //             {task.team_users.map(team_user => <Avatar key={team_user.id} src={team_user.user.profile_picture_url} name={team_user.user.first_name + " " + team_user.user.last_name} round={true} size="50" textSizeRatio={1} />)}
                        //         </div>
                        //         { isAdmin && <button onClick={(e) => deleteHandler(e, task)}> Delete </button>}
                        //     </div>
                        // </TaskDiv>
                    )}
                </TaskUl>
            </SectionDiv>
        </>
    )
}

const TaskUl = styled.ul`
margin-block-start: 0em;
margin-block-end: 0em;
padding-inline-start: 0px;
margin-bottom: 50px;

`

const TaskLi = styled.li`
    // border: 1px solid black;
    border-radius: 50px;
    width: 250px;
    height: 250px;
    margin-right: 50px;
    :nth-child(3n) {
        margin-right: 0px;
    }
    margin-top: 10px;
    margin-bottom: 50px;
    box-shadow: 0 0px 15px -8px rgb(0 0 0 / 70%);
    display: flex;
    // justify-content: center;
    // align-items: center;
    flex-direction: column;
    .top-div {
        height: 50px;
        width: 100%;
    }
    .mid-div {
        height: 150px;
    }
    .bottom-div {
        width: 100%;
        border-style: solid;
        border-color: #e2e8f0;
        border-top-width: 1px;
        border-bottom-width: 0px;
        border-right-width: 0px;
        border-left-width: 0px;
    }
`

const SectionDiv = styled.div`
    .section-holder {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
`

// const TaskDiv = styled(motion.div)`
//     border: 2px solid #e2d9d5;
//     cursor: pointer;
//     margin-bottom: 10px;
//     margin-left: 2em;
//     margin-right: 2em;
//     border-radius: 5px;
//     background-color: ${props => props.completed ? "#94f0ff" : "#e43737ad" };
//     animation-duration: 0.2s;
//     .name-complete {
//         display: flex;
//         justify-content: space-between;
//         margin: 0 30px 0 20px;
//     }
//     .avatar-assigned-to {
//         display: flex;
//         justify-content: space-between;
//         margin-left: 1em;
//         margin-bottom: 5px;
//         margin-right: 30px;
//     }
//     &:hover {
//         box-shadow: 0 0px 10px -6px rgba(0,0,0,0.7);
//     }
// `

export default Section
