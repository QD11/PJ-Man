import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import CreateTask from './CreateTask'

const ProjectInfo = () => {
    const {project} = useParams()
    const isAdmin = useSelector(state => state.isAdmin)

    //fetch all tasks and sections specific to this project
    //get section with serializer of tasks

    return (
        <div>
            {project}
            {isAdmin && <CreateTask projectName={project}/>}
        </div>
    )
}

export default ProjectInfo
