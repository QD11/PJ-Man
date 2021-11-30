import React, {useState} from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {getAllProjects} from '../../../../../redux/projectSlice'
import {motion, AnimatePresence} from 'framer-motion'
import {RiFileAddLine} from 'react-icons/ri'
import DndAssign from './DndAssign'

const CreateTask = ({projectInfo}) => {
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const [showCreate, setShowCreate] = useState(false)
    const [responseMsg, setResponseMsg] = useState(null)
    const [taskForm, setTaskForm] = useState({
        name: "",
        section: "",
        description: "",
        project_id: projectInfo.id,
        member: 1,
        team_id: team.id,
    })     

    const handleChange = (e) => {
        setTaskForm({
            ...taskForm,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskForm)
        })
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {
                    dispatch(getAllProjects(data))
                    }
                )} 
            else {
                resp.json()
                .then((err) => console.log(err.errors));
            }
        })
    }

    return (
        <CreateDiv>
            <motion.div onClick={() => setShowCreate(showCreate => !showCreate)}>
                <RiFileAddLine/>
                <ItemSpan> Add Task</ItemSpan>
            </motion.div>
            <AnimatePresence initial={false}>
            {showCreate && <FormMotion 
                onSubmit={handleSubmit}
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 }
                }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.83, 0.98] }}
            >   <div>
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
                    <button type="submit">Create</button>
                    {responseMsg && <span>{responseMsg}</span>}
                </div>
                <div className="assign-div">
                    {/* <label>Assign To </label>
                    <input required="required" type="text" autocomplete="off" onChange={handleChange}></input> */}
                    <DndAssign />
                </div>
            </FormMotion>}
            </AnimatePresence>
        </CreateDiv>
    )
}
const FormMotion = styled(motion.form)`
    display:flex;
    .assign-div {
        margin-left: 20px;
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
    border-radius: 10px;
    padding: 10px 10px;
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 70%);
    background: rgb(248 248 248 / 100%);
`

export default CreateTask
