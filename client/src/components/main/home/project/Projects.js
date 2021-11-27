import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import {BsPencilSquare} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'
import CreateProject from './CreateProject'

const Projects = () => {
    const navigate = useNavigate()
    const isAdmin = useSelector(state => state.isAdmin)
    const team = useSelector(state => state.team)
    const [createHover, setCreateHover] = useState(false)
    const [createOpen, setCreateOpen] = useState(false)

    console.log(createOpen)

    return (
        <div>
            {isAdmin && <CreateProject />}
        </div>
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
