import React, {useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
// import CreateTask from './CreateTask'
import Section from './Section'
import styled from 'styled-components'
// import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import Avatar from 'react-avatar'
import Modal from './Modal.js'
import CustomSelect from './PJDropdown.js'
import StateToggle from './StateToggle'

const ProjectInfo = () => {
    const [filter, setFilter] = useState("All")
    const isAdmin = useSelector(state => state.isAdmin)
    const projects = useSelector(state => state.team).projects
    const { project_id } = useParams()
    const projectInfo = projects.find(proj => proj.id === parseInt(project_id))
    const sections = projectInfo.sections
    ///
    const tasks = []
    const teamUsers = []
    sections.forEach(section => section.tasks.forEach(task => tasks.push(task)))
    // const completedTasks = `${(tasks.filter(task => task.completed === true).length)}/${tasks.length}`
    // const completedTasksPercent = 100 * (tasks.filter(task => task.completed === true).length/tasks.length ? tasks.filter(task => task.completed === true).length/tasks.length : 0)
    tasks.forEach(task => task.team_users.forEach(a => teamUsers.push(a)))
    function unique(array, propertyName) {
        return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
    }
    const [val, setVal] = useState("All")
    const options = [
        "All", "Ongoing", "Completed"
    ]


    return (
        <ProjectDiv priority={projectInfo.priority}>
            <div className="title-header">
                <h1 className="proj-name">{projectInfo.name}</h1>
                <StateToggle projectInfo={projectInfo}/>
                {isAdmin && <Modal projectInfo={projectInfo}/>}
            </div>
            <div className="task-header">
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
            {/* <div> */}
                {sections.map(section => <Section key={section.id} val={val} section={section} />)}
            {/* </div> */}
        </ProjectDiv>
    )
}

const ProjectDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    background-color:#fff;
    border-radius: 20px;
    padding: 40px;
    width: 80%;
    height: fit-content;
    transition: 0.5s;
    margin-top: 0px;
    margin-bottom: 50px;
    box-shadow: -8px 8px 0px 3px ${props => props.priority === "low" ? "#93d36b" : props.priority === "medium"? "#6ac9f4": "#f0ada8"};
    // &:hover {
    //     box-shadow: -20px 0px 0px 0px ${props => props.priority === "low" ? "#93d36b" : props.priority === "medium"? "#6ac9f4": "#f0ada8"};
    // }
    .title-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 40px;
    }

    .chart-div {
        width: 170px;
        height: 170px;
        .text-chart {
            font-size: 40px;
        }
    }
    .proj-name {
        font-size: 4em;
        margin-bottom: 10px;
        margin-top: 0;
    }
    .task-status {
        display: flex;
        flex-direction: column;
        margin-right: 80px;
    }
    .task-header {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: 20px;
        font-size: 25px;
    }
`

const ProjectInfoDiv = styled.div`
    width: 650em;
    .projectName {
        display: flex;
        justify-content: center;
    }
    .create-task-div {
        display:flex;
        margin: 10px;
        // justify-content: flex-end;
    }
`

const ContentDiv = styled.div`
    border: 1px solid #e2d9d5;
    border-radius: 5px;
    background-color: #fff;
    .content-in-content {
        margin-left: 20px;
        margin-bottom: 50px;
    }
    .proj-div {
        padding: 10px;
    }
    .projectName {
        background-color: #244cb385;
        font-size: 45px;
        font-weight: 900;
        color: whitesmoke;
        letter-spacing: 3px;
    }
`

export default ProjectInfo
