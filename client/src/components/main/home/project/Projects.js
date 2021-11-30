import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { motion} from 'framer-motion'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

import CreateProject from './CreateProject'
import ProjectList from './ProjectList'

const Projects = () => {
    const navigate = useNavigate()
    const isAdmin = useSelector(state => state.isAdmin)
    const team = useSelector(state => state.team)
    const [createHover, setCreateHover] = useState(false)
    const [createOpen, setCreateOpen] = useState(false)

    return (
        <>
            {isAdmin && <CreateProject />}
            <ProjectList />
        </>
    )
}

//  <AnimatePresence>
// {createHover && 
//     <motion.span
//         initial={{ opacity: 0}}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//     >
//         Create A New Project
//     </motion.span>
// }
// </AnimatePresence>

const CreateDiv = styled(motion.div)`
    //border:1px solid black;
    font-size: 20px;
`


export default Projects
