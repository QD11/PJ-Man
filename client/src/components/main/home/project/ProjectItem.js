import React from 'react'
import {useSelector} from 'react-redux'
import {motion} from 'framer-motion'
import styled from 'styled-components'

const ProjectItem = ({project}) => {

    return (
        <ProjectLI>
            <div class="card card-top-right">
                <div class="card-inner">
                <h2 class="card-title">{project.name}</h2>
                <div class="card-body">Lorem ipsum dolor sit amhe;;pzzzzzzzzzzet, consectetur adipisicing elit.</div>
                </div>
            </div>
        </ProjectLI>
    )
}

const ProjectLI = styled(motion.li)`
    list-style: none;
`


export default ProjectItem
