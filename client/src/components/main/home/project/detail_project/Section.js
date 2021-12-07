import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import Avatar from 'react-avatar'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { getAllProjects } from '../../../../../redux/projectSlice'
import { getTeam } from '../../../../../redux/teamSlice'
import {RiMoreFill, RiCheckboxCircleFill, RiCloseCircleFill} from 'react-icons/ri'
import {AiFillDelete} from 'react-icons/ai'
import  {BiTask, BiTaskX} from 'react-icons/bi'
import {ImRadioUnchecked} from 'react-icons/im'

const Section = ({section, val}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.isAdmin)
    const team = useSelector(state => state.team)

    const deleteHandler = (task) => {
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
    console.log(section.tasks)
    return (
        <>
            <SectionDiv>
                <h2>{section.name}</h2>
                <TaskUl className="section-holder">
                    {(val === "Ongoing" ? section.tasks.filter(task => !task.completed) : val === "Completed" ? section.tasks.filter(task => task.completed) : section.tasks).map(task => 
                    // {section.tasks.map(task => 
                        <TaskLi key={task.id}>
                            <div className="icon-div">
                                {/* <div className="completed"> */}
                                    {task.completed ? <Completed /> : <NotCompleted />}
                                {/* </div> */}
                                <span className="date">{task.created_at.slice(5,10)+'-'+task.created_at.slice(0,4)}</span>
                                {isAdmin && <Trash onClick={() => deleteHandler(task)} />}
                            </div>
                            {/* <div className="completed">
                                {task.completed ? <Completed /> : <NotCompleted />}
                            </div> */}
                            <span className="task-name">{task.name}</span>
                            <span className="description">{task.description.length < 10  ? task.description : task.description.slice(0,10) + "..."}</span>
                            {/* <span className="completed">{task.completed? "Completed": "Not Completed"}</span> */}
                            
                            {/* <div className="avatar-container">
                            </div> */}
                            <div className="bottom-div">
                                <div className="avatar-container">
                                {task.team_users.slice(0,4).map(teamUser => 
                                    <Avatar key={teamUser.user.id}  src={teamUser.user.profile_picture_url} name={teamUser.user.first_name + ' ' +  teamUser.user.last_name} round={true} size="30" textSizeRatio={1.75}/>
                                    )}
                                </div>
                                <div>
                                    <span onClick={()=> navigate(`${section.id}/${task.id}`)} className="enter">View</span>
                                </div>
                            </div>
                        </TaskLi>
                    )}
                </TaskUl>
            </SectionDiv>
        </>
    )
}

const Completed = styled(RiCheckboxCircleFill)`
    margin-left: 6px;
    font-size: 30px;
    color:green;
`

const NotCompleted = styled(RiCloseCircleFill)`
    margin-left: 6px;
    font-size: 30px;
    color:red;
`

const Trash = styled(AiFillDelete)`
    color: black;
    cursor: pointer;
    font-size: 20px;
`

const TaskUl = styled.ul`
font-famil
margin-block-start: 0em;
margin-block-end: 0em;
padding-inline-start: 0px;
// margin-bottom: 50px;
// width: 775px;
width: 100%;
font-family: 'Readex Pro', sans-serif;


`

const TaskLi = styled.li`
    // border: 1px solid black;
    // background-color: #f4433673;
    border-radius: 30px;
    width: 225px;
    // height: 225px;
    min-height: 225px;
    margin-right: 100px;
    :nth-child(3n) {
        margin-right: 0px;
    }
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 50px;
    box-shadow: 0 0px 15px -8px rgb(0 0 0 / 30%);
    display: flex;
    // justify-content: center;
    // align-items: center;
    flex-direction: column;

    .completed {
        display: flex;
        justify-content: flex-end;
    }
    .icon-div {
        align-items: center;
        display: flex;
        margin: 0 20px 0 20px;
        justify-content: space-between;
        .date {
            font-size: 13px;
            color: #8f8f8f;
        }
    }
    .task-name {
        font-size: 25px;
        width: 100%;
        text-align: center;
        // padding: 5px;
        word-wrap: break-word;
        hyphens: auto;
        white-space: normal;
    }

    .description {
        // padding: 10px;
        margin-bottom: 5px;
        text-align: center;
    }

    .completed {
        padding: 10px;
    }

    .avatar-container {
        padding: 5px 5px 5px 5px;
    }

    .content {
        padding: 25px;
        width: 100%;
    }

    }
    .bottom-div {
        display:flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        border-style: solid;
        border-color: #e2e8f0;
        // border-color: blue;
        border-top-width: 1px;
        border-bottom-width: 0px;
        border-right-width: 0px;
        border-left-width: 0px;
        .enter {
            margin-right: 10px;
            display: inline-block;
            color: #03a9f4;;
            background-color: #b9e1f4;
            border-radius: 9999px;
            font-size: 1rem;
            font-weight: 500;
            margin-left: .75rem;
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            cursor: pointer;
        }
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
