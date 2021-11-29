import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
// import CreateProject from './CreateProject'
import {useNavigate, Route, Routes, useParams} from 'react-router-dom'
import {useSelector} from 'react-redux'

// import Projects from './Projects'
import ProjectInfo from './ProjectInfo'
import Task from './Task'

const ProjRoutes = () => {
    const isAdmin = useSelector(state => state.isAdmin)
    const {project} = useParams()

    return (
        <Routes>
            <Route path="/" element={<ProjectInfo project={project}/>} />
            <Route path="/:section/:task" element={<Task />} />
        </Routes>
    )
}

export default ProjRoutes