import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {motion} from 'framer-motion'
import styled from 'styled-components'

import ProjectItem from './ProjectItem'
import CustomSelect from './dropdown/Dropdown'
import CreateProject from './CreateProject'

const ProjectList = () => {
    // const projects = useSelector(state => state.projects)
    const isAdmin = useSelector(state => state.isAdmin)
    const [val, setVal] = useState("All")
    const [val2, setVal2] = useState("All")
    const projects = useSelector(state => state.team).projects
    const options = [
        "All", "Ongoing", "Completed"
    ]
    const options2 = [
        "All", "Low", "Medium", "High"
    ]

    const filteredProjects = val === "Ongoing" ? projects.filter(project => !project.completed) : val === "Completed"  ? projects.filter(project => project.completed) : projects
    const priorityProjects = val2 === "Low" ? projects.filter(project => project.priority === "low") : val2 === "Medium"  ? projects.filter(project => project.priority === "medium") : val2 === "High"  ? projects.filter(project => project.priority === "high"): filteredProjects

    const compare = (a,b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }
    const alphabeticalProjects = [...priorityProjects].sort(compare)


    return (
        <>
            <Clicker>
                
                <CustomSelect
                    value={val}
                    onChange={setVal}
                    options={options}
                    // placeholder="Choose an option..."
                />
                <CustomSelect
                    value={val2}
                    onChange={setVal2}
                    options={options2}
                    // placeholder="Choose an option..."
                />
                {isAdmin && <CreateProject />}
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
                {alphabeticalProjects.map(project => <ProjectItem val={val} key={project.id} project={project}/>)}
            </ProjectUL>
        </>
    )
}
const Clicker = styled.div`
// margin-top: 10px;
    z-index: 1;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const ProjectUL = styled(motion.ul)`
    // width: 500px;
    padding-inline-start: 0px;
    display:flex;
    // margin-top: 100px;
    flex-wrap: wrap;
`

export default ProjectList
