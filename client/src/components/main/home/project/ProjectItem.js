import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {motion, AnimatePresence} from 'framer-motion'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {BsThreeDots} from 'react-icons/bs'
import {RiDeleteBin2Line, RiArchiveLine} from 'react-icons/ri'
import {getAllProjects} from '../../../../redux/projectSlice'

const ProjectItem = ({project}) => {
    const dispatch = useDispatch()
    const [option, setOption] = useState(false)
    const [respMsg, setRespMsg] = useState(null)
    const team = useSelector(state => state.team)
    const [updateForm, setUpdateForm] = useState({
        name: project.name,
        priority: project.priority,
        team_id: team.id
    })
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`${project.id}`)
    }

    const updateChange = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name] : e.target.value
        })
    }

    const updateSubmit = (e) => {
        e.preventDefault()
        fetch(`/projects/${project.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"
            },
            body: JSON.stringify(updateForm) 
        })
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => dispatch(getAllProjects(data)))
            }
            else {
                resp.json()
                .then(err => setRespMsg(err.errors))
            }
        })  
    }

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
                                <DotsIcon onClick={e => {
                                    e.stopPropagation()
                                    setOption(option => !option)
                                }}/>
                                <AnimatePresence initial={false}>
                                    {option && <DotsForm
                                            onSubmit={updateSubmit}
                                            initial="collapsed"
                                            animate="open"
                                            exit="collapsed"
                                            variants={{
                                                open: { opacity: 1, width: "auto", height: 110,
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
                                            <NameMotion onChange={updateChange} type="text" value={updateForm.name} name="name"></NameMotion>
                                            <PriorityUpdateDiv>
                                                <div>
                                                    <label>Priority: </label>
                                                    <motion.select onChange={updateChange} name="priority" defaultValue={updateForm.priority} name="priority">
                                                        <option value="low">Low</option>
                                                        <option value="medium">Med</option>
                                                        <option value="high">High</option>
                                                    </motion.select>
                                                </div>
                                                <UpdateBut type="submit">Update</UpdateBut>
                                            </PriorityUpdateDiv>
                                            <DelDiv>
                                                <ArchiveIcon onClick={() => console.log("QQQQ")}/>
                                                <span>{respMsg}</span>
                                                <DelIcon onClick={() => console.log("QQQQ")}/>
                                            </DelDiv>
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
                        <div>
                            <span>Members?</span>
                        </div>
                    </div>
                </div>
            </div>
        </ProjectLI>
    )
}

const UpdateBut = styled.button`
    // margin-top: 5px;
    // margin-left: 10px;
    font-size: 20px;
`

const PriorityUpdateDiv = styled(motion.div)`
    margin-top: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}
`
const DelIcon = styled(RiDeleteBin2Line)`
    transition: transform .2s;
    color: red;
    &:hover {
        transform: scale(1.5);
    }
`

const ArchiveIcon = styled(RiArchiveLine)`
    transition: transform .2s;
    &:hover {
        transform: scale(1.5);
    }
`

const DotsIcon = styled(BsThreeDots)`
    transition: transform .2s;
    &:hover {
        transform: scale(1.5);
    }
`


const DelDiv = styled(motion.div)`
    display: flex;
    justify-content: space-between;
`

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
    background-color: #ffe0a8;
    border-radius: 5px;
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
