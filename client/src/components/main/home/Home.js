import React from 'react'
import {useNavigate, Route, Routes} from 'react-router-dom'
import styled from 'styled-components'

import SideNav from './sidenav/SideNav'
import ProjectRoutes from './project/ProjectRoutes'
import MemberPage from '../../members/MemberPage'
import ForumMain from '../../forum/ForumMain'

const Home = () => {
    return (
        <PageDiv>
            < SideNav />
            <RightDiv name="right-div">
                <Routes>
                    <Route path="/" element={<div><h1>Dashboard</h1></div>} />
                    <Route path="/project/*" element={<ProjectRoutes/>} />
                    <Route path="/members/*" element={<MemberPage/>} />
                    <Route path="/forum/*" element={<ForumMain />} />
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
    // margin: 10px 0px 0px 20px;
    width: 1000px;
    margin: 2rem 11rem;
`



export default Home
