import React from 'react'
import {useNavigate, Route, Routes} from 'react-router-dom'
import styled from 'styled-components'

import SideNav from './sidenav/SideNav'
import ProjectRoutes from './project/ProjectRoutes'

const Home = () => {
    return (
        <PageDiv>
            < SideNav />
            <RightDiv name="right-div">
                <Routes>
                    <Route path="/" element={<div><h1>Dashboard</h1></div>} />
                    <Route path="/project/*" element={<ProjectRoutes/>} />
                </Routes>
            </RightDiv>
        </PageDiv>
    )
}

const PageDiv = styled.div`
    display: flex;
`

const RightDiv = styled.div`
    display: flex;
    margin: 10px 0px 0px 20px;
    width: 1000px;
`



export default Home
