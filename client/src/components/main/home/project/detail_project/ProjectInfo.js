import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CreateTask from './CreateTask'
import Section from './Section'
import {useNavigate, Route, Routes} from 'react-router-dom'
import Task from './Task'

const ProjectInfo = () => {
    // const [projectInfo, setProjectInfo] = useState([])
    // const {project} = useParams()
    const isAdmin = useSelector(state => state.isAdmin)
    const projects = useSelector(state => state.projects)
    const { project_id } = useParams()
    //fetch all tasks and sections specific to this project
    //get section with serializer of tasks
    const projectInfo = projects.find(proj => proj.id === parseInt(project_id))

    return (
        <div>
            {isAdmin && <CreateTask projectInfo={projectInfo}/>}
            <h2>{projectInfo.name}</h2>
            {projectInfo.sections.map(section => <Section key={section.id} section={section} />)}

        </div>
    )
}

export default ProjectInfo
