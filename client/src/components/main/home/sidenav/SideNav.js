import React, {useState} from 'react'
import styled from 'styled-components'
import {AnimateSharedLayout, motion, AnimatePresence} from 'framer-motion'

import SideItem from './SideItem'
import { RiDashboardLine, RiTodoLine } from 'react-icons/ri'
import { useSelector } from 'react-redux'


const SideNav = () => {
    const team = useSelector(state => state.team)
    const items = [{
        name: "Dashboard",
        icon: < RiDashboardLine />,
        url: `/${team.name}`,
    },
    {
        name: "Project",
        icon: < RiTodoLine />,
        url: `/${team.name}/project`,
    }
    ]


    return (
        <SideDiv>
            {items.map(item => <SideItem key={item.name} item={item} />)}
        </SideDiv>
    )
}

const SideDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 15%;
    margin: 20px 20px 20px 50px;
`

export default SideNav
