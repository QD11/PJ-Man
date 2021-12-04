import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CreateTask from './CreateTask'
import Section from './Section'
import styled from 'styled-components'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import Avatar from 'react-avatar'
import Modal from './Modal.js'

const ProjectInfo = () => {
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
    // const uniqueTeamUsers = unique(teamUsers, 'id')    

    return (
        // <ProjectInfoDiv>
        //     <div className="create-task-div">
        //         {isAdmin && <CreateTask projectInfo={projectInfo}/>}
        //     </div>
        //     <ContentDiv>
        //         <div className="proj-div">
        //             <h1 className="projectName">{projectInfo.name}</h1>
        //         </div>
        //         <div className="content-in-content">
        //             {projectInfo.sections.map(section => <Section key={section.id} section={section} />)}
        //         </div>
        //     </ContentDiv>
        // </ProjectInfoDiv>
        <>
            <ProjectDiv priority={projectInfo.priority}>
                <div class="title-header">
                    <h1 className="proj-name">{projectInfo.name}</h1>
                    <Modal projectInfo={projectInfo}/>
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
                </div>
                {/* <div> */}
                    {sections.map(section => <Section key={section.id} section={section} />)}
                {/* </div> */}
            </ProjectDiv>
        </>
    )
}

const ProjectDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    // font-family: Quarion, sans-serif;
    flex-direction: column;
    width: fit-content;
    background-color:#fff;
    border-radius: 20px;
    padding: 40px;
    width: fit-content;
    height: fit-content;
    transition: 0.5s;
    // box-shadow: -10px 0px 0px 0px ${props => props.priority === "low" ? "#4caf50" : props.priority === "medium"? "#03a9f4": "#f44336"};
    // &:hover {
    //     box-shadow: -20px 0px 0px 0px ${props => props.priority === "low" ? "#4caf50" : props.priority === "medium"? "#03a9f4": "#f44336"};
    // }
    .title-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
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
        margin-bottom: 20px;
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
