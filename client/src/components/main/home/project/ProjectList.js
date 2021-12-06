import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {motion} from 'framer-motion'
import styled from 'styled-components'

import ProjectItem from './ProjectItem'
import CustomSelect from './dropdown/Dropdown'

const ProjectList = () => {
    // const projects = useSelector(state => state.projects)
    const [val, setVal] = useState("All")
    const projects = useSelector(state => state.team).projects
    const options = [
        "All", "Ongoing", "Completed"
    ]

    const filteredProjects = val === "Ongoing" ? projects.filter(project => !project.completed) : val === "Completed"  ? projects.filter(project => project.completed) : projects

    return (
        <>
            <Clicker>
                {/* <select >
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>All</option>
                </select> */}
                <CustomSelect
                    value={val}
                    onChange={setVal}
                    options={options}
                    // placeholder="Choose an option..."
                />
            </Clicker>
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
                {filteredProjects.map(project => <ProjectItem val={val} key={project.id} project={project}/>)}
            </ProjectUL>
        </>
    )
}
const Clicker = styled.div`
// margin-top: 10px;
    z-index: 1;
    margin-bottom: 30px;
`

const ProjectUL = styled(motion.ul)`
    // width: 500px;
    padding-inline-start: 0px;
    display:flex;
    // margin-top: 100px;
    flex-wrap: wrap;
`

export default ProjectList
