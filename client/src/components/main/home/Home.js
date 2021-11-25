import React from 'react'
import SideNav from './sidenav/SideNav'
import {useNavigate, Route, Routes} from 'react-router-dom'
import styled from 'styled-components'

const Home = () => {
    return (
        <PageDiv>
            < SideNav />
            <Routes>
                <Route path="/" element={<div><h1>Dashboard</h1></div>} />
                <Route path="/project" element={<div><h1>Project</h1></div>} />
            </Routes>
        </PageDiv>
    )
}

const PageDiv = styled.div`
    display: flex;
`



export default Home
