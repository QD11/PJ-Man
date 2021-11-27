import React, {useState} from 'react'
import styled from 'styled-components'
import {AnimateSharedLayout, motion, AnimatePresence} from 'framer-motion'

import SideItem from './SideItem'
import { RiTeamLine, RiDashboardLine, RiTodoLine, RiCalendarTodoFill } from 'react-icons/ri'
import { BsPeople } from 'react-icons/bs'
import { useSelector } from 'react-redux'


const SideNav = () => {
    const team = useSelector(state => state.team)
    const items = [{
        name: "Dashboard",
        icon: < RiDashboardLine />,
        url: `/${team.name}`,
    },
    {
        name: "Projects",
        icon: < RiTodoLine />,
        url: `/${team.name}/project`,
    },
    {
        name: "Members",
        icon: < RiTeamLine />,
        url: `/${team.name}/member`,
    },
    {
        name: "Calendar",
        icon: < RiCalendarTodoFill />,
        url: `/${team.name}/calendar`,
    },
    ]

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 5,
                staggerChildren: 0.9,
                staggerDirection: 1
            }
        }
    }

    return (
        <SideDiv>
            {/* {items.map(item => <SideItem key={item.name} item={item} />)} */}
            <motion.ul 
                initial="hidden"
                animate="show"
                // exit="hidden"
                variants={container}
            >
                {items.map(item => <SideItem key={item.name} item={item} />)}
            </motion.ul>
        </SideDiv>
    )
}

const SideDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 12em;
    margin: 20px 20px 20px 0px;
`

export default SideNav
