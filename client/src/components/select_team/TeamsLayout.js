import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { motion } from "framer-motion"
import styled from 'styled-components'
import {fetchLogOut} from '../../redux/userSlice'
import {emptyProjects} from '../../redux/projectSlice'
import {isAdmin} from '../../redux/adminSlice'
import { useNavigate} from 'react-router-dom';
import {RiLogoutCircleRLine, RiFileListLine} from 'react-icons/ri'
import {MdOutlineCreate} from 'react-icons/md'
import {GiTeamIdea} from 'react-icons/gi'
import TeamCard from './TeamCard'
import NewTeam from './NewTeam'
import TeamItem from './TeamItem'

const TeamsLayout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const [newTeamForm, setNewTeamForm] = useState(false)
    const [recruitResp, setRecruitResp] = useState("")
    const [joinForm, setJoinForm] = useState(false) 
    const [teams, setTeams] = useState([])
    const [code, setCode] = useState("")

    console.log(code)
    const MINUTE_MS = 60000;

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         fetch(`/${user.id}/organizations`)
    //         .then(resp => resp.json())
    //         .then(data => setOrganizations(data))
    //     }, MINUTE_MS)

    useEffect(() => {
        fetch(`/${user.id}/teams`)
        .then(resp => resp.json())
        .then(data => setTeams(data))
    }, [user])

    const handleLogOut = () => {
        dispatch(fetchLogOut('/logout'))
        dispatch(isAdmin(false))
        dispatch(emptyProjects())
        navigate('/')
    }

    const joinSubmit = (e) => {
        e.preventDefault()
        fetch('/join', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: code,
                user_id: user.id,
                email: user.email,
            }),
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(team => {
                    setTeams(teams => [...teams, team])
                    setNewTeamForm(false)
                })
            } else {
                r.json().then((err) => setRecruitResp(err.errors));
            }})
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delayChildren: 5,
                staggerChildren: 0.9,
                staggerDirection: 1
            }
        }
    }

    const items = [{
        name: "Teams",
        icon: < RiFileListLine />,
        nav: () => setNewTeamForm(false)
    },
    {
        name: "Create/Join",
        icon: < GiTeamIdea />,
        nav: () => setNewTeamForm(true)
    },
    // {
    //     name: "Join",
    //     icon: < RiTeamLine />
    // }
    ]

    return (
        <div>
            <NavBar className="buttons">
                {/* <button onClick={()=>setJoinForm(joinForm => !joinForm)}>Join Team </button> */}
                {/* <button onClick={()=>setNewTeamForm(bool => !bool)}>New Team</button> */}
                <div className="logout" onClick={handleLogOut}>
                    <span>Logout</span>
                    <Logout />
                </div>
            </NavBar>
            <Content>
                <SideDiv>
                    {/* {items.map(item => <SideItem key={item.name} item={item} />)} */}
                    <SideList 
                        initial="hidden"
                        animate="show"
                        // exit="hidden"
                        variants={container}
                    >
                        {items.map(item => <TeamItem key={item.name} item={item} />)}
                    </SideList>
                </SideDiv>
            {/* {joinForm && 
                <form onSubmit={joinSubmit}>
                    <label>Enter Code: </label>
                    <input type="text" name="code" onChange={(e) => setCode(e.target.value)}></input>
                    <button type="submit">Submit</button>
                    <span>{recruitResp}</span>
                </form>
                } */}
            {newTeamForm ? <NewTeam setCode={setCode} setTeams={setTeams} setNewTeamForm={setNewTeamForm} joinSubmit={joinSubmit} recruitResp={recruitResp} /> 
                : 
                <MotionUl>
                    {teams.map(team => <TeamCard key={team.id} team={team} />)}
                </MotionUl> 
            }
            </Content>
        </div>
    )
}

const Content = styled.div`
    display: flex;
    flex-direction: row;
`

const SideList = styled(motion.ul)`
    padding-inline-start: 20px;
    position: sticky;
    top: 30px;
    position: fixed;
    top: 5em;
`

const SideDiv = styled.div`
    display: flex;
    flex-direction: column;
    // width: 10em;
    width: 13%;
    margin: 20px 0px 20px 0px;
    z-index: 3;
`

const Logout = styled(RiLogoutCircleRLine)`
    font-size: 30px;
    cursor: pointer;
    color: #fff;
    margin-right: 30px;
`

const NavBar = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background-color: #434343;
    height: 60px;
    box-shadow: 0 0px 30px -6px rgba(0,0,0,0.9);
    z-index: 5;

    .logout {
        display: flex;
        width: fit-content;
        align-items: center;
        color: white;
        & span {
            margin-right: 5px;
        }
    }
`

const MotionUl = styled(motion.ul)`
    color: #2b2b81;
    list-style: none;
    width: 87%;
    display: flex;
    flex-direction: column;
    padding: 0px;
    border-radius: 25px;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
    margin-top: 50px;
    // align-items: center;
    margin-left: 10em;
`

export default TeamsLayout
