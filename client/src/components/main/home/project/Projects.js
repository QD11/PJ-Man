import React from 'react'
import { motion} from 'framer-motion'
import styled from 'styled-components'
import ProjectList from './ProjectList'

const Projects = () => {

    return (
        <FlexDiv>
            {/* {isAdmin && <CreateProject />} */}
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
    width: 100%;
    // font-size: 20px;
`


export default Projects
