import React from 'react'
import {Route, Routes} from 'react-router-dom'
import styled from 'styled-components'

import Dashboard from './Dashboard'
import SideNav from './sidenav/SideNav'
import ProjectRoutes from './project/ProjectRoutes'
import MemberPage from '../../members/MemberPage'
import ForumMain from '../../forum/ForumMain'
import ChatBar from '../../chat/ChatBar'


const Home = () => {
    return (
        <PageDiv>
            < SideNav />
            <RightDiv name="right-div">
                <Routes>
                    <Route path="/" element={<Dashboard/>} />
                    <Route path="/project/*" element={<ProjectRoutes/>} />
                    <Route path="/members/*" element={<MemberPage/>} />
                    <Route path="/forum/*" element={<ForumMain />} />
                </Routes>
            </RightDiv>
            < ChatBar />
        </PageDiv>
    )
}

const PageDiv = styled.div`
    display: flex;
`

const RightDiv = styled.div`
    display: flex;
    // margin: 10px 0px 0px 20px;
    width: 1100px;
    // width: 70%;
    // width: 100%;
    // margin: 2rem 3rem;
    // margin-left: 2em;
    margin-top: 50px;
`



export default Home
