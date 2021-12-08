import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import Card from './Card'
import { v4 as uuid } from "uuid";
import {RiUserAddLine, RiUserUnfollowLine} from 'react-icons/ri'
import { motion } from 'framer-motion'
import AddMember from './AddMember'

const MemberPage = () => {
    const userInfo = useSelector(state => state.user)
    const team = useSelector(state => state.team)
    const isAdmin = useSelector(state => state.isAdmin)
    // const filterUserTeam = team.users.filter(user => user.id !== userInfo.id)
    // const [email, setEmail] = useState('')
    // const [code, setCode] = useState('')
    const [showOpen, setShowOpen] = useState(false)
    const [showRemove, setShowRemove] = useState(false)
    const [recruitResp, setRecruitResp] = useState("")
    const [searchVal, setSearchVal] = useState("")

    const teamUserCurrentInfo = team.team_users.find(user => user.user_id === userInfo.id)

    // useEffect(() => {
    //     setCode(uuid)
    // }, [showOpen])

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     fetch('/recruitments', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             code: code,
    //             email: email,
    //             team_id: team.id
    //         })
    //     })
    //     .then((r) => {
    //         if (r.ok) {
    //             r.json()
    //             .then(data => setRecruitResp("Success! Make sure to send this code!"))
    //         } else {
    //             r.json().then((err) => setRecruitResp(err.errors));
    //         }})
    // }

    // const filterUserTeam = team.team_users.map(team_user => team_user.user).filter(user => user.id !== userInfo.id)
    
    const compare = (a,b) => {
        if (a.first_name < b.first_name) {
            return -1;
        }
        if (a.first_name > b.first_name) {
            return 1;
        }
        return 0;
    }
    const searchFilterTeam = searchVal ? team.team_users.map(team_user => team_user.user).filter(teamUser => (teamUser.first_name+teamUser.last_name).toUpperCase().includes(searchVal.toUpperCase())) : team.team_users.map(team_user => team_user.user)
    const alphabeticalUserTeam = searchFilterTeam.sort(compare)

    return (
        <MembersDiv>
            {/* <SearchInput type="text" /> */}
            <div className="members-div">
                <SearchInput placeholder="Search Member" onChange={e => setSearchVal(e.target.value)} />
                {isAdmin && <div >
                    {/* <div onClick={() => setShowOpen(showOpen => !showOpen)} style={{cursor: "pointer"}}> */}
                        {/* < RiUserAddLine/>
                        <ItemSpan> Add Member</ItemSpan> */}
                        < AddMember/>
                    {/* </div> */}
                    {/* {showOpen && 
                        <form onSubmit={handleSubmit}>
                            <p>This will generate a unique code for your member to join this team. This code is specifically tied to the provided email.</p>
                            <EmailDiv>
                                <label for="email-input">Email:</label>
                                <input type="email" id="email-input" name="email" onChange={(e) => setEmail(e.target.value)}/>
                            </EmailDiv>
                            <div>
                                <label> Code:  </label>
                                <span> {code} </span>
                            </div>
                            <button type="submit">Submit</button>
                            <span>{recruitResp}</span>
                        </form>} */}
                </div>}
                {/* {teamUserCurrentInfo.owner && <RemoveDiv
                    onClick={() => setShowRemove(showRemove => !showRemove)}
                    animate={showRemove ? {background: "red"} : {background: "#f8f8f8"}}
                >
                    <motion.div 
                        animate={showRemove ? {background: "red"} : {background: "#f8f8f8"}}
                    >
                        < RiUserUnfollowLine/>
                        <ItemSpan> Remove Member</ItemSpan>
                    </motion.div>
                </RemoveDiv>} */}
            </div>
            <CardContainer>
                {/* <Card userInfo={userInfo} user={userInfo} team_user={team.team_users.find(team_user => team_user.user_id === userInfo.id)}/> */}
                <CardUL>
                    {alphabeticalUserTeam.map(user => <Card key={user.id} showRemove={showRemove} teamUserCurrentInfo={teamUserCurrentInfo} userInfo={userInfo} user={user} team_user={team.team_users.find(team_user => team_user.user_id === user.id)}/>)}
                </CardUL>
            </CardContainer>
        </MembersDiv>
    )
}

const SearchInput = styled.input`
    width: 300px;
    height: fit-content;
    min-width: 150px;
    height: 44px;
    background-color: #253858;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    padding: 0 14px;
    // cursor: pointer;
    width: 150px;
`

const CardUL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    list-style-type: disc;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
`

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

// const CreateDiv = styled(motion.div)`
//     flex-direction: column;
//     display:flex;
//     width: fit-content;
//     margin-bottom: 50px;
//     font-size: 25px;
//     height: fit-content;
//     border-radius: 10px;
//     padding: 15px;
//     box-shadow: 0 0px 20px -6px rgb(0 0 0 / 70%);
//     background: rgb(248 248 248 / 100%);
//     & p {
//         width: 550px;
//     }
// `

const RemoveDiv = styled(motion.div)`
    cursor: pointer;
    flex-direction: column;
    display:flex;
    width: fit-content;
    // margin-bottom: 20px;
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
    width: 100%;
    .members-div {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        align-items: center;
    }
`

const CardContainer = styled.div`
    // margin-top: 20px;
    // .user-card {
    //     margin-bottom: 40px;
    // }
`

export default MemberPage
