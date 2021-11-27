import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import CreateProject from './CreateProject'
import {useNavigate, Route, Routes} from 'react-router-dom'
import Projects from './Projects'
import {useSelector} from 'react-redux'

const ProjectRoutes = () => {
    const isAdmin = useSelector(state => state.isAdmin)

    return (
        <div>
            <Routes>
                    <Route path="/" element={<Projects/>} />
                    {/* {isAdmin && <Route path="/create" element={<CreateProject/>} />} */}
            </Routes>
        </div>
    )
}



export default ProjectRoutes
