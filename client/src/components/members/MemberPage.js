import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import Card from './Card'
import { v4 as uuid } from "uuid";
import {RiUserAddLine} from 'react-icons/ri'
import { motion } from 'framer-motion'
import { useEffect } from 'react/cjs/react.development';

const MemberPage = () => {
    const userInfo = useSelector(state => state.user)
    const team = useSelector(state => state.team)
    const filterUserTeam = team.users.filter(user => user.id !== userInfo.id)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [showOpen, setShowOpen] = useState(false)

    useEffect(() => {
        setCode(uuid())
    }, [showOpen])

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('/recruitments', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: code,
                email: email,
                team_id: team.id
            })
        })
    }

    return (
        <MembersDiv>
            <CreateDiv>
                <div 
                    onClick={() => setShowOpen(showOpen => !showOpen)}
                >
                    < RiUserAddLine/>
                    <ItemSpan> Add Member</ItemSpan>
                </div>
                {showOpen && 
                    <form onSubmit={handleSubmit}>
                        <p>This will generate a unique code for your member to join this team. This code is specifically tied to the provided email. He/she will have 48 hours to join.</p>
                        <EmailDiv>
                            <label for="email-input">Email:</label>
                            <input type="email" id="email-input" name="email" onChange={(e) => setEmail(e.target.value)}/>
                        </EmailDiv>
                        <div>
                            <label> Code:  </label>
                            <span> {code} </span>
                        </div>
                        <button type="submit">Submit</button>
                    </form>}
            </CreateDiv>
            <CardContainer>
                <Card userInfo={userInfo} user={userInfo} team_user={team.team_users.find(team_user => team_user.user_id === userInfo.id)}/>
                {filterUserTeam.map(user => <Card key={user.id} userInfo={userInfo} user={user} team_user={team.team_users.find(team_user => team_user.user_id === user.id)}/>)}
            </CardContainer>
        </MembersDiv>
    )
}

const EmailDiv = styled(motion.div)`
    display: flex;
    & input {
        margin-left: 5px;
        width: 100%;
    }
`

const ItemSpan = styled(motion.span)`
    font-weight: bold;
    font-weight: 500;
    // margin-bottom: -10px;
`

const CreateDiv = styled(motion.div)`
    flex-direction: column;
    display:flex;
    width: fit-content;
    margin-bottom: 20px;
    font-size: 25px;
    height: fit-content;
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 70%);
    background: rgb(248 248 248 / 100%);
    & p {
        width: 550px;
    }
`

const MembersDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const CardContainer = styled.div`
    margin-top: 20px;
`

export default MemberPage
