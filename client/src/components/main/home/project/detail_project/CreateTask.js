import React, {useState} from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'

const CreateTask = ({projectName}) => {
    const team = useSelector(state => state.team)
    const [showCreate, setShowCreate] = useState(false)
    const [responseMsg, setResponseMsg] = useState(null)
    const [taskForm, setTaskForm] = useState({
        name: "",
        section: "",
        description: "",
        // completed: false,
        projectName: projectName,
        team_id: team.id,
        member: 1,
    })    

    const handleChange = (e) => {
        setTaskForm({
            ...taskForm,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(taskForm)
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
                .then(task => {
                    console.log(task)
                    }
                )} 
            else {
                resp.json()
                .then((err) => console.log(err.errors));
            }
        })
    }

    return (
        <div>
            <button onClick={() => setShowCreate(showCreate => !showCreate)}>Create Task</button>
            {showCreate && <form onSubmit={handleSubmit}>
                <div>
                    <label>Task</label>
                    <input type="text" name="name" onChange={handleChange}></input>
                </div>
                <div>
                    <label>Section
                        <input list="sections" name="section" onChange={handleChange}/>  
                    </label>   
                    <datalist id="sections">
                        <option value="Chrome" />
                        <option value="Firefox" />
                        <option value="Internet Explorer" />
                        <option value="Opera" />
                        <option value="Safari" />
                        <option value="Microsoft Edge" />   
                    </datalist>
                </div>
                <DivDesc>
                    <label>Description</label>   
                    <InputDesc type="text" cols="40" rows="10" wrap="physical" name="description" onChange={handleChange}></InputDesc>
                </DivDesc>
                <div>
                    {/* implement id to member */}
                    <label>Assign To </label>
                    <input type="text" onChange={handleChange}></input>
                </div>
                <button type="submit">Create</button>
                {responseMsg && <span>{responseMsg}</span>}
            </form>}
        </div>
    )
}

const DivDesc = styled.div`
    display: flex;
`

const InputDesc = styled.textarea`
    // width: 20em;
    // line-height: 5em;
`

export default CreateTask
