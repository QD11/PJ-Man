import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import CreateProject from './CreateProject'
import {useNavigate, Route, Routes} from 'react-router-dom'
import {useSelector} from 'react-redux'

import Projects from './Projects'
// import ProjectInfo from './detail_project/ProjectInfo'
import ProjRoutes from './detail_project/ProjRoutes'

const ProjectRoutes = () => {
    const isAdmin = useSelector(state => state.isAdmin)

    return (
        <Routes>
            <Route path="/" element={<Projects/>} />
            <Route path="/:project/*" element={<ProjRoutes />} />
            {/* {isAdmin && <Route path="/create" element={<CreateProject/>} />} */}
        </Routes>
    )
}



export default ProjectRoutes
