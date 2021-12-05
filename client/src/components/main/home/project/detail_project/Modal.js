import React, { useState, useEffect } from "react";
// import "./Modal.css";
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import { getTeam } from '../../../../../redux/teamSlice'
import {motion, AnimatePresence} from 'framer-motion'
import {RiFileAddLine, RiAddCircleLine} from 'react-icons/ri'
import DndAssign from './DndAssign'

const Modal = ({projectInfo}) => {
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const [showCreate, setShowCreate] = useState(false)
    const [responseMsg, setResponseMsg] = useState(null)
    const [taskForm, setTaskForm] = useState({
        name: "",
        section: "",
        description: "",
        project_id: projectInfo.id,
        team_id: team.id,
    })     

    const members = team.team_users.map(team_user => team_user.user)
    const teamUsers = team.team_users.map(team_user => team_user.id)

    const itemsFromBackend = members.map((member, index) => {
        return ({
            ...member,
            id : member.id.toString(), 
            team_user_id: teamUsers[index]
        })
    })
        
    const columnsFromBackend = {
        members : {
            name: "Members",
            items: itemsFromBackend
        },
        assigned_members: {
            name: "Assign To",
            items: []
        },
    };

    const [columns, setColumns] = useState(columnsFromBackend);

    const handleChange = (e) => {
        setTaskForm({
            ...taskForm,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const submitForm = {
            ...taskForm,
            member : columns.assigned_members.items
        }
        
        fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(submitForm)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {
                    dispatch(getTeam(data))
                    setResponseMsg("Task created successfully")
                    setTaskForm({
                        name: "",
                        section: "",
                        description: "",
                        project_id: projectInfo.id,
                        team_id: team.id
                    })
                    setColumns({
                        ['members']: {
                            name: "Members",
                            items: itemsFromBackend
                        },
                        ['assigned_members']: {
                            name: "Assign To",
                            items: []
                        },
                    })
                    setTimeout(() => setShowCreate(false), 1000)
                    }
                )} 
            else {
                resp.json()
                .then((err) => console.log(err.errors));
            }
        })
    }
    
    useEffect(() => {
        setResponseMsg('')
        setColumns({
            ['members']: {
                name: "Members",
                items: itemsFromBackend
            },
            ['assigned_members']: {
                name: "Assign To",
                items: []
            },
        })
    }, [modal])
    /////////////////////////////////////////////
    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
        {/* <AddTask
            whileHover={{scale: 1.1 }}
            whileTap={{scale: 0.9 }}
        > */}
            <AddTask onClick={toggleModal} className="btn-modal"/>
        {/* </AddTask> */}

        {modal && (
            <ModalDiv className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h2>Create A Task!</h2>
                    <CreateDiv>
                        <FormMotion 
                            onSubmit={handleSubmit}
                            // key="content"
                            // initial="collapsed"
                            // animate="open"
                            // exit="collapsed"
                            // variants={{
                            // open: { opacity: 1, height: "auto" },
                            // collapsed: { opacity: 0, height: 0 }
                            // }}
                            // transition={{ duration: 0.8, ease: [0.04, 0.62, 0.83, 0.98] }}
                        >   
                            <div className="combine-div">
                                <div>
                                    <div>
                                        <InputMotion required="required" placeholder="Task" type="text" name="name" autocomplete="off" onChange={handleChange}></InputMotion>
                                    </div>
                                    <div>
                                        <InputMotion required="required" placeholder="Section" list="sections" autocomplete="off" name="section" onChange={handleChange}/>  
                                        <datalist id="sections">
                                            {projectInfo.sections.map(section => <option key={section.id} value={`${section.name}`} /> )}
                                        </datalist>
                                    </div>
                                    <DivDesc>
                                        <InputDesc required="required" placeholder="Description" type="text" cols="40" rows="10" wrap="physical" autocomplete="off" name="description" onChange={handleChange}></InputDesc>
                                    </DivDesc>
                                </div>
                                <div className="assign-div">
                                    {/* <label>Assign To </label>
                                    <input required="required" type="text" autocomplete="off" onChange={handleChange}></input> */}
                                    <DndAssign setColumns={setColumns} columns={columns}/>
                                </div>
                            </div>
                            <div>
                                <button type="submit">Create</button>
                                {responseMsg && <span>{responseMsg}</span>}
                            </div>
                        </FormMotion>
                        {/* </AnimatePresence> */}
                    </CreateDiv>
                    <button className="close-modal" onClick={toggleModal}>
                    CLOSE
                    </button>
                </div>
            </ModalDiv>
        )}
        </>
    );
}

const AddTask = styled(RiAddCircleLine)`
    font-size: 70px;
    cursor: pointer;
`

const ModalButton = styled.button`
    padding: 10px 20px;
    display: block;
    /* margin: 100px auto 0; */
    font-size: 18px;
`

const ModalDiv = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;

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
`

const FormMotion = styled(motion.form)`
    // display:flex;
    .assign-div {
        margin-left: 20px;
    }
    .combine-div {
        display: flex;
    }
`

const InputMotion = styled(motion.input)`
    width: 309px;
    // height: 30px;
    font-size: 24px;
`

const ItemSpan = styled(motion.span)`
    font-weight: bold;
    font-weight: 500;
    // margin-bottom: -10px;
`

const DivDesc = styled.div`
    display: flex;
    margin-top: 10px;
`

const InputDesc = styled.textarea`
    width: 309px;
    // line-height: 5em;
    font-size: 24px;
`

const CreateDiv = styled(motion.div)`
    flex-direction: column;
    display:flex;
    width: fit-content;
    margin-bottom: 20px;
    font-size: 25px;
    height: fit-content;
    // border-radius: 10px;
    // padding: 10px 10px;
    // box-shadow: 0 0px 20px -6px rgb(0 0 0 / 70%);
    // background: rgb(248 248 248 / 100%);
`


export default Modal