import React from 'react'
// import CreateProject from './CreateProject'
import { Route, Routes} from 'react-router-dom'
import {useSelector} from 'react-redux'

// import Projects from './Projects'
import ProjectInfo from './ProjectInfo'
import Task from './Task'

const ProjRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<ProjectInfo />} />
            <Route path="/:section_id/:task_id" element={<Task />} />
        </Routes>
    )
}

export default ProjRoutes