import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {motion, AnimatePresence} from 'framer-motion'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {BsThreeDots} from 'react-icons/bs'

const ProjectItem = ({project}) => {
    const [option, setOption] = useState(false)
    const [updateForm, setUpdateForm] = useState({
        name: project.name,
        priority: project.priority
    })
    const team = useSelector(state => state.team)
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/${team.name}/project/${project.name}`)
    }
    console.log(option)
    return (
        <ProjectLI priority={project.priosity}>
            <div className="card card-top-right" onClick={handleClick}>
                <div className="card-inner">
                    <TitleDiv>
                        {/* <h2 className="card-title">{project.name}</h2> */}
                            <DotsDiv
                                onClick={e => e.stopPropagation()}
                                // whileHover={{scale: 1.1 }}
                                // onClick={() => console.log('hey')}
                            >
                                <BsThreeDots onClick={e => {
                                    e.stopPropagation()
                                    setOption(option => !option)
                                }}/>
                                <AnimatePresence initial={false}>
                                    {option && <DotsForm
                                            initial="collapsed"
                                            animate="open"
                                            exit="collapsed"
                                            variants={{
                                                open: { opacity: 1, width: "auto", height: "auto",
                                                    transition:{ 
                                                        duration: 0.3, 
                                                        ease: [0.04, 0.62, 0.83, 0.99],
                                                    }},
                                                collapsed: { opacity: 0, width: 0, height: 0,
                                                    transition:{ 
                                                        duration: 0.3, 
                                                        ease: [0.04, 0.82, 0.83, 0.99],
                                                        delay: 0.1,
                                                    }
                                                }
                                            }}
                                        >
                                            <NameMotion type="text" value={updateForm.name}></NameMotion>
                                            <motion.div>
                                                <label>Priority</label>
                                                <motion.select defaultValue={updateForm.priority} name="priority">
                                                    <option value="low">Low</option>
                                                    <option value="medium">Med</option>
                                                    <option value="high">High</option>
                                                </motion.select>
                                            </motion.div>
                                            <button type="submit">Update</button>
                                        </DotsForm>
                                    }   
                                </AnimatePresence>
                            </DotsDiv>
                    </TitleDiv>
                    <h2 className="card-title">{project.name}</h2>
                    <div className="card-body">
                        <span>Show priority</span>
                        <div>
                        <span>Tasks #/#</span>
                        </div>
                    </div>
                </div>
            </div>
        </ProjectLI>
    )
}

const NameMotion = styled(motion.input)`
    width: 200px;
`

const DotsForm = styled(motion.form)`
    width: fit-content;
`

const FormDiv = styled(motion.form)`
    // position: relative;
`

const DotsDiv = styled(motion.div)`
    position: absolute;
    // right: 40px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    // width: fit-content;
    height: fit-content;
    outline: 1px solid #e2d9d5;
    z-index: 2;
    padding: 5px;
    background-color: #fde5e5
`

const TitleDiv = styled.div`
    display:flex;
    justify-content: flex-end;
`

const ProjectLI = styled(motion.li)`
    height: 265px;
    width: 250px;
    list-style: none;
    margin-right: 80px;
    // box-shadow: 0 0px 20px -6px rgb(127 0 231)
`


export default ProjectItem
