import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {RiFileAddLine} from 'react-icons/ri'

import { addProject } from '../../../../redux/projectSlice'
import { getTeam } from '../../../../redux/teamSlice'

const CreateProject = () => {
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const [responseMsg, setResponseMsg] = useState(null)
    const [createOpen, setCreateOpen] = useState(false)
    const [createForm, setCreateForm] = useState({
        name: '',
        priority: 'low',
        team_id: team.id,
    })
    useEffect(() => {
        setCreateForm({
            ...createForm,
            name: '',
            priority: 'low',
            team_id: team.id
        })
        setResponseMsg(null)
    }, [createOpen === false])

    const handleChange = (e) => {
        setCreateForm(createForm => ({
            ...createForm,
            [e.target.name] : e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(createForm),
        }).then((r) => {
            if (r.ok) {
                r.json()
                .then(data => {
                    dispatch(getTeam(data))
                    // setResponseMsg(`${project.name} created`)
                })
            } else {
                r.json().then((err) => setResponseMsg(err.errors));
            }})
    }

    return (
        <CreateDiv name="create-project-div">
            <motion.div onClick={() => setCreateOpen(createOpen => !createOpen)}>
                <RiFileAddLine/>
                <ItemSpan> Add Project</ItemSpan>
            </motion.div>
            <AnimatePresence initial={false}>
                    {createOpen && <ClickedForm
                        onSubmit ={handleSubmit}
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.83, 0.98] }}
                    >
                        <div>
                            <InputMotion priority={createForm.priority} type="text" autocomplete="off" placeholder="Name" onChange={handleChange} name="name"></InputMotion>
                        </div>
                        <div>
                            <motion.select onChange={handleChange} name="priority">
                                <option value="low">Low</option>
                                <option value="medium">Med</option>
                                <option value="high">High</option>
                            </motion.select>
                            <SubmitMotion type="submit" disabled={createForm.name? false : true}>Create</SubmitMotion>
                        </div>
                        <div>
                            <motion.span>{responseMsg}</motion.span>
                        </div>
                    </ClickedForm>
                    }
                </AnimatePresence>


            {/* fix this */}
            {/* <AnimatePresence initial={false}>
            {onHover && !createOpen && <motion.div
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                    open: { opacity: 1, width: "auto",
                        transition:{ 
                            duration: 0.3, 
                            ease: [0.04, 0.62, 0.83, 0.98],
                        }},
                    collapsed: { opacity: 0, width: 0,
                        transition:{ 
                            duration: 0.3, 
                            ease: [0.04, 0.82, 0.83, 0.99],
                            delay: 0.3,
                        }
                    }
                }}
            >
                <ItemSpan
                    layout
                    variants={{
                        open: { opacity: 1, width: "auto",
                        transition:{
                            type: 'tween',
                            duration: 0.3, 
                            ease: "easeInOut",
                            delay: 0.3
                        }},
                        collapsed: { opacity: 0, width: 0,
                            transition:{ 
                                duration: 0.2, 
                                ease: [0.04, 0.62, 0.83, 0.99],
                            }
                        }
                    }}
                    >Add Project</ItemSpan>
            </motion.div>}
            //when clicked
            {createOpen  && <ClickedDiv
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                    open: { opacity: 1, width: "auto", height: 300,
                        transition:{ 
                            duration: 0.3, 
                            ease: [0.04, 0.62, 0.83, 0.98],
                        }},
                    collapsed: { opacity: 0, width: 0, height: 0,
                        transition:{ 
                            duration: 0.3, 
                            ease: [0.04, 0.82, 0.83, 0.99],
                            delay: 0.3,
                        }
                    }
                }}
            >
                <ItemSpan
                    layout
                    variants={{
                        open: { opacity: 1, width: "auto",
                        transition:{
                            type: 'tween',
                            duration: 0.3, 
                            ease: "easeInOut",
                            delay: 0.3
                        }},
                        collapsed: { opacity: 0, width: 0,
                            transition:{ 
                                duration: 0.2, 
                                ease: [0.04, 0.62, 0.83, 0.99],
                            }
                        }
                    }}
                    >Add Project
                </ItemSpan>
                <motion.input
                    layout
                    variants={{
                        open: { opacity: 1, width: "auto",
                        transition:{
                            type: 'tween',
                            duration: 0.3, 
                            ease: "easeInOut",
                            delay: 0.3
                        }},
                        collapsed: { opacity: 0, width: 0, height: 0,
                            transition:{ 
                                duration: 0.2, 
                                ease: [0.04, 0.62, 0.83, 0.99],
                            }
                        }
                    }}
                >
                </motion.input>

            </ClickedDiv>}
            </AnimatePresence> */}
        </CreateDiv>
    )
}

const InputMotion = styled(motion.input)`
    background-color: ${props => props.priority === "low" ? "#b3ffe5" : props.priority === "medium"? "#b7cbfb": "#fdb4b4"}
`

const SubmitMotion = styled(motion.button)`
    margin-left: 10px;
`

const ItemSpan = styled(motion.span)`
    font-weight: bold;
    font-weight: 500;
    // margin-bottom: -10px;
`

const ClickedForm = styled(motion.form)`
    // position: absolute;
`

const CreateDiv = styled(motion.div)`
    position: absolute;
    z-index: 100;
    top: 72px;
    left: 950px;
    flex-direction: column;
    display:flex;
    width: 170px;
    margin-bottom: 20px;
    font-size: 25px;
    height: fit-content;
    cursor: pointer;
    border-radius: 10px;
    padding: 10px 10px;
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 70%);
    background: rgb(248 248 248 / 100%);
`



export default CreateProject
