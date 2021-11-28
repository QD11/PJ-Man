import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CreateTask from './CreateTask'

const ProjectInfo = () => {
    // const [projectInfo, setProjectInfo] = useState([])
    const {project} = useParams()
    const isAdmin = useSelector(state => state.isAdmin)
    const projects = useSelector(state => state.projects)

    //fetch all tasks and sections specific to this project
    //get section with serializer of tasks
    const projectInfo = projects.find(proj => proj.name === project)

    return (
        <div>
            {project}
            {isAdmin && <CreateTask projectInfo={projectInfo}/>}
        </div>
    )
}

export default ProjectInfo
