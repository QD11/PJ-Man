import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {RiFileAddLine, RiFileAddFill} from 'react-icons/ri'

import { getTeam } from '../../../../redux/teamSlice'

const CreateProject = () => {
    const [modal, setModal] = useState(false)
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
    ////
    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        // <CreateDiv name="create-project-div">
        <>
            <motion.div className="btn-div">
                {/* <RiFileAddLine/>
                <ItemSpan> Add Project</ItemSpan> */}
                <AddProject onClick={toggleModal}/>
            </motion.div>
            {/* <AnimatePresence initial={false}>
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
                </AnimatePresence> */}
            {modal && 
                <ModalDiv className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <form className="container" onSubmit={handleSubmit}>
                            <div>
                                <span className="project-name">Project Name: </span>
                                <InputMotion autoComplete="off" priority={createForm.priority} type="text" autocomplete="off" placeholder="Name" onChange={handleChange} name="name"></InputMotion>
                            </div>
                            <div className="prio-div">
                                <span>Priority: </span>
                                <motion.select onChange={handleChange} name="priority" className="prio-drop">
                                    <option value="low">Low</option>
                                    <option value="medium">Med</option>
                                    <option value="high">High</option>
                                </motion.select>
                            </div>
                            <div className="btn-div">
                                <SubmitMotion className="btn" type="submit" disabled={createForm.name? false : true}>Create</SubmitMotion>
                                {responseMsg &&  <motion.span>{responseMsg}</motion.span>}
                            {/* </div>
                            <div> */}
                            </div>
                        </form>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </ModalDiv>}
                {/* </CreateDiv> */}
        </>
    )
}

const InputMotion = styled(motion.input)`
    background-color: ${props => props.priority === "low" ? "#93d36b" : props.priority === "medium"? "#6ac9f4": "#f0ada8"};
    font-size: 30px;
`

const SubmitMotion = styled(motion.button)`
    font-size: 30px;
`

const ItemSpan = styled(motion.span)`
    font-weight: bold;
    font-weight: 500;
    // margin-bottom: -10px;
`

const AddProject = styled(RiFileAddFill)`
    // position: absolute;
    margin-right: 100px;
    font-size: 60px;
    cursor: pointer;
    color: #253858;
`

const CreateDiv = styled(motion.div)`
    flex-direction: column;
    display:flex;
    width: 100%;
    justify-content: flex-end;
    z-index: 2;
    // position: absolute;
    // top: 72px;
    // left: 950px;
    // margin-bottom: 20px;
    // font-size: 25px;
    // height: fit-content;
    // cursor: pointer;
    // border-radius: 10px;
    // padding: 10px 10px;
    // box-shadow: 0 0px 20px -6px rgb(0 0 0 / 70%);
    // background: rgb(248 248 248 / 100%);
    .btn-div {
        display:flex;
        justify-content: flex-end;
    }
`


const ModalDiv = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 3;
    .overlay {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        background: rgba(49,49,49,0.8);
    }

    .modal-content {
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1.4;
        background: #f1f1f1;
        padding: 14px 28px;
        border-radius: 3px;
        // max-width: 600px;
        // min-width: 300px;
        width: fit-content;
    }

    .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 7px;
    }

    .container {
        height: fit-content;
        width: fit-content;
        padding: 50px;
        font-size: 30px;
        & span {
            display: inline-block;
            min-width: 220px;
        }
        .prio-div {
            margin-top: 20px;
            .prio-drop {
                font-size: 30px;
            }
            
        }
        .btn-div {
            display: flex;
            margin-top: 20px;
            .btn {
                // font-size: 30px;
            }
        }
    }
`




export default CreateProject
