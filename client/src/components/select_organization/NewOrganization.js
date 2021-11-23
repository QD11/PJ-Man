import React, {useState} from 'react'
import {useSelector} from 'react-redux'

const NewOrganization = ({setOrganizations}) => {
    const user = useSelector(state => state.user)
    const [errors, setErrors] = useState([])
    const [orgForm, setOrgForm] = useState({
        name: '',
        description: '',
        user_id: user.id
    })

    const handleChange = (e) => {
        setOrgForm({
            ...orgForm,
            [e.target.name]: e.target.value
        })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/organizations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(orgForm),
        }).then((r) => {
            if (r.ok) {
                r.json()
                .then((data) => {
                    setOrganizations(orgs => [...orgs, data])
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
                <label>Name of the Organization: </label>
                <input type="text" name="name" onChange={handleChange}></input>
                <label>Description: </label>
                <input type="text" name="description" onChange={handleChange}></input>
                <button type="submit">Submit</button>
                <span>{errors}</span>
            </form>
        </div>
    )
}

export default NewOrganization
