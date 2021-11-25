import React from 'react'
import {useNavigate, Route, Routes} from 'react-router-dom'
import styled from 'styled-components'

import SideNav from './sidenav/SideNav'
import ProjectMain from './project/ProjectMain'

const Home = () => {
    return (
        <PageDiv>
            < SideNav />
            <Routes>
                <Route path="/" element={<div><h1>Dashboard</h1></div>} />
                <Route path="/project/*" element={<ProjectMain/>} />
            </Routes>
        </PageDiv>
    )
}

const PageDiv = styled.div`
    display: flex;
`



export default Home
