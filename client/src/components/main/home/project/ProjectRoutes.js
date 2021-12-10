import React from 'react'
import {Route, Routes} from 'react-router-dom'

import Projects from './Projects'
// import ProjectInfo from './detail_project/ProjectInfo'
import ProjRoutes from './detail_project/ProjRoutes'

const ProjectRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Projects/>} />
            <Route path="/:project_id/*" element={<ProjRoutes />} />
            {/* {isAdmin && <Route path="/create" element={<CreateProject/>} />} */}
        </Routes>
    )
}



export default ProjectRoutes
