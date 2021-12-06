import React from 'react'
import {useSelector} from 'react-redux'
import { motion} from 'framer-motion'
import styled from 'styled-components'


import CreateProject from './CreateProject'
import ProjectList from './ProjectList'

const Projects = () => {
    const isAdmin = useSelector(state => state.isAdmin)

    return (
        <FlexDiv>
            {isAdmin && <CreateProject />}
            <ProjectList />
        </FlexDiv>
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

const FlexDiv = styled(motion.div)`
    //border:1px solid black;
    display: flex;
    flex-direction: column;
    // font-size: 20px;
`


export default Projects
