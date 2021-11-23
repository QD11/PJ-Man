import React from 'react'

const OrganizationCard = ({organization}) => {
    return (
        <div>
            <span>Name: {organization.name}</span>
            <span>Description: {organization.description}</span>
        </div>
    )
}

export default OrganizationCard
