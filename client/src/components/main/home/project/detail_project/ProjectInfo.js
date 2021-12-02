import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CreateTask from './CreateTask'
import Section from './Section'
import styled from 'styled-components'

const ProjectInfo = () => {
    const isAdmin = useSelector(state => state.isAdmin)
    const projects = useSelector(state => state.team).projects
    const { project_id } = useParams()
    const projectInfo = projects.find(proj => proj.id === parseInt(project_id))

    return (
        <ProjectInfoDiv>
            <div className="create-task-div">
                {isAdmin && <CreateTask projectInfo={projectInfo}/>}
            </div>
            <ContentDiv>
                <div className="proj-div">
                    <h1 className="projectName">{projectInfo.name}</h1>
                </div>
                <div className="content-in-content">
                    {projectInfo.sections.map(section => <Section key={section.id} section={section} />)}
                </div>
            </ContentDiv>
        </ProjectInfoDiv>
    )
}

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
