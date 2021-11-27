import React from 'react'
import {useSelector} from 'react-redux'
import {motion} from 'framer-motion'
import styled from 'styled-components'

import ProjectItem from './ProjectItem'

const ProjectList = () => {
    const projects = useSelector(state => state.projects)


    return (
        <ProjectUL 
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        delayChildren: 5,
                        staggerChildren: 0.9,
                        staggerDirection: 1
                    }
                }
            }}
        >
            {projects.map(project => <ProjectItem key={project.key} project={project}/>)}
        </ProjectUL>
    )
}

const ProjectUL = styled(motion.ul)`
    width: 300px;
    padding-inline-start: 0px;
`

export default ProjectList
