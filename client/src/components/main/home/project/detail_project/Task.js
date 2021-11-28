import React from 'react'
import {useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

const Task = ({project}) => {
    const params = useParams()
    console.log(params)
    const taskInfo = useSelector(state => state.projects).find(project => project.name === params.project).sections.find(section => section.name === params.section).tasks.find(task => task.name === params.task)

    return (
        <div>
            {taskInfo.name}
        </div>
    )
}

export default Task
