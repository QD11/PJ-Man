import React, {useEffect, useState} from 'react'
import UserCard from './UserCard'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { RiArrowRightSFill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'
import { RiCheckboxCircleFill, RiCloseCircleFill} from 'react-icons/ri'
import {AiFillDelete} from 'react-icons/ai'
import CustomSelect from '../home/project/detail_project/PJDropdown'


const User = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const team = useSelector(state => state.team)
    const team_user = team.team_users.find(team_user => team_user.user_id === user.id)
    const [tasks, setTasks] = useState([])
    const [val, setVal] = useState("All")
    const options = [
        "All", "Ongoing", "Completed"
    ]
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
                <div className="task-header">
                    <h1>Your Tasks</h1>
                    <div className="tasksss">
                        <div className="task-status">
                            <span>{tasks.filter(task => task.completed === true).length}</span>
                            <span>Completed</span>
                        </div>
                        <div className="task-status">
                            <span>{tasks.filter(task => task.completed === false).length}</span>
                            <span>In Progress</span>
                        </div>
                        <div className="task-status">
                            <span>{tasks.length}</span>
                            <span>Total</span>
                        </div>
                        <div>
                            <CustomSelect
                                value={val}
                                onChange={setVal}
                                options={options}
                                // placeholder="Choose an option..."
                            />
                        </div>
                    </div>
                </div>
                <TaskUL>
                    {(val === "Ongoing" ? tasks.filter(task => !task.completed) : val === "Completed" ? tasks.filter(task => task.completed) : tasks).map(task => 
                    <>
                        {/* <TaskLI key={task.id} onClick={() => navigate(`/${team.name}/project/${task.section.project.id}/${task.section.id}/${task.id}`)}>
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
                        </TaskLI> */}
                        <TaskLi key={task.id}>
                            <div className="icon-div">
                                <div className="section-project">
                                    <span className="project">{task.section.project.name}</span>
                                    <RiArrowRightSFill />
                                    <span className="section">{task.section.name}</span>
                                    {/* <RiArrowRightSFill /> */}
                                    {/* <span>{task.name}</span> */}
                                </div>
                                {/* <div className="completed"> */}
                                    {task.completed ? <Completed /> : <NotCompleted />}
                                {/* </div> */}
                                {/* <span className="date">{task.created_at.slice(5,10)+'-'+task.created_at.slice(0,4)}</span> */}
                                {/* {isAdmin && <Trash onClick={() => deleteHandler(task)} />} */}
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
                                <div className="view">
                                    <span onClick={()=> navigate(`/${team.name}/project/${task.section.project.id}/${task.section.id}/${task.id}`)} className="enter">View</span>
                                </div>
                            </div>
                        </TaskLi>
                    </>
                    )}
                </TaskUL>
            </div>
        </UserDiv>
    )
}

const Trash = styled(AiFillDelete)`
    color: black;
    cursor: pointer;
    font-size: 20px;
`

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

const TaskUL = styled.ul`
    margin-bottom: 40px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 10em;
`

// const TaskLI = styled.li`
//     list-style: none;
//     align-items:center;
//     border-radius: 5px;
//     border: 1px solid #e2e8f0;
//     margin-top: 40px;
//     // height: 141px;
//     padding: 2em;
//     width: 600px;
//     background-color: #fff;
//     font-family: system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
//     .task {
//         font-size: 25px;
//         margin-bottom: 10px;
//     }
//     .project {
//         // min-width: 350px;
//         // display: inline-block;
//     }
// `


const TaskLi = styled.li`
    // border: 1px solid black;
    background-color: #fff;
    border-radius: 30px;
    width: 225px;
    // height: 225px;
    min-height: 225px;
    margin-right: 100px;
    // :nth-child(3n) {
    //     margin-right: 0px;
    // }
    justify-content: space-around;
    margin-top: 10px;
    margin-bottom: 50px;
    box-shadow: 0 0px 15px -8px rgb(0 0 0 / 30%);
    display: flex;
    // justify-content: center;
    // align-items: center;
    flex-direction: column;

    .section-project {
        font-size: 13px;
        color: gray;
    }

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
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        border-style: solid;
        border-color: #e2e8f0;
        // border-color: blue;
        border-top-width: 1px;
        border-bottom-width: 0px;
        border-right-width: 0px;
        border-left-width: 0px;
        .view {
            margin-top: 10px;
        }
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


const UserDiv = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .tasks-div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
    }
    .task-header {
        display: flex;
        flex-direction: column;
        margin-top: 40px;
        width: 100%;
        align-items: center;
        .task-status {
            display: flex;
            flex-direction: column;
            margin-right: 80px;
            font-size: 20px;
        }
        .tasksss {
            display: flex;
            width: 100%;
            justify-content: center;
        }
    }
`



export default User
