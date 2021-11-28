import React from 'react'
import {useSelector} from 'react-redux'
import {motion} from 'framer-motion'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

const ProjectItem = ({project}) => {
    const team = useSelector(state => state.team)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/${team.name}/project/${project.name}`)
    }

    return (
        <ProjectLI priority={project.priosity}>
            <div class="card card-top-right" onClick={handleClick}>
                <div class="card-inner">
                <h2 class="card-title">{project.name}</h2>
                <div class="card-body">Lorem ipsum dolor sit amhe;;pzzzzzzzzzzet, consectetur adipisicing elit.</div>
                </div>
            </div>
        </ProjectLI>
    )
}

const ProjectLI = styled(motion.li)`
    height: 350px;
    width: 250px;
    list-style: none;
    margin-right: 80px;
    // box-shadow: 0 0px 20px -6px rgb(127 0 231)
`


export default ProjectItem
