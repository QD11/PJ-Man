import React, {useState} from 'react'
import {useSelector} from 'react-redux'


const NewTeam = ({setTeams, setNewTeamForm}) => {
    const user = useSelector(state => state.user)
    const [errors, setErrors] = useState([])
    const [teamForm, setTeamForm] = useState({
        name: '',
        description: '',
        user_id: user.id
    })

    const handleChange = (e) => {
        setTeamForm({
            ...teamForm,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/teams", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(teamForm),
        }).then((r) => {
            if (r.ok) {
                r.json()
                .then((data) => {
                    setTeams(orgs => [...orgs, data])
                    setNewTeamForm(false)
                });
            } 
            else {
                r.json()
                .then((error) => setErrors(error.error));
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name of the Team: </label>
                <input type="text" name="name" onChange={handleChange}></input>
                <label>Description: </label>
                <input type="text" name="description" onChange={handleChange}></input>
                <button type="submit">Submit</button>
                <span>{errors}</span>
            </form>
        </div>
    )
}

export default NewTeam
