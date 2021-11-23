import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

import OrganizationCard from './OrganizationCard'
import NewOrganization from './NewOrganization'

const OrganizationsLayout = () => {
    const user = useSelector(state => state.user)
    const [newOrgForm, setNewOrgForm] = useState(false)
    const [organizations, setOrganizations] = useState([])

    useEffect(() => {
        fetch(`/${user.id}/organizations`)
        .then(resp => resp.json())
        .then(data => setOrganizations(data))
    }, [user])

    return (
        <div>
            <button onClick={()=>setNewOrgForm(bool => !bool)}>New Form</button>
            {newOrgForm ? <NewOrganization setOrganizations={setOrganizations} setNewOrgForm={setNewOrgForm}/> : organizations.map(organization => <OrganizationCard key={organization.id} organization={organization} />)}
        </div>
    )
}

export default OrganizationsLayout
