import React, {useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { fetchTeamLogOut } from '../../redux/teamSlice'
import { fetchLogOut } from '../../redux/userSlice'
import { isAdmin } from '../../redux/adminSlice'
import { emptyProjects } from '../../redux/projectSlice'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {RiLogoutCircleRLine, RiUserLine} from 'react-icons/ri'
import {MdOutlineArrowBack} from 'react-icons/md'
import {VscHome} from 'react-icons/vsc'
import logo from '../../pajamas.png'

const NavBar = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [active, setActive] = useState(params["*"])

    const team = useSelector(state => state.team)

    const onClickTeams = () => {
        // dispatch(logOutTeam())
        dispatch(fetchTeamLogOut('/logout_team'))
        dispatch(isAdmin(false))
        dispatch(emptyProjects())
        navigate('/')
    }

    const handleLogOut = () => {
        dispatch(fetchLogOut('/logout'))
        dispatch(fetchTeamLogOut('/logout_team'))
        dispatch(isAdmin(false))
        dispatch(emptyProjects())
        navigate('/')
    }

    const teamHandle = () => {
        navigate(`/${team.name}`)
        setActive("home")
    }

    const userHandle = () => {
        navigate(`/${team.name}/user`)
        setActive("user")
    }
    return (
        <NavDiv className="NavDiv" active={active}>
            {/* <button onClick={onClickTeams}>Back to Teams</button> */}
            < BackTeam onClick={onClickTeams}/>
            <div onClick={teamHandle} className="team">
                <span>Home</span>
                < VscHome />
            </div>
            <div>
                <img alt="logo" src={logo} width="40" height="40"/>
            </div>
            <div onClick={userHandle}  className="user">
                <span>User</span>
                < RiUserLine />
            </div>
            <div className="logout" onClick={handleLogOut}>
                <span>Logout</span>
                <Logout />
            </div>
        </NavDiv>
    )
}

const BackTeam = styled(MdOutlineArrowBack)`
    font-size: 30px;
    cursor: pointer;
    color: #fff;
    margin-left: 30px;
`

const Logout = styled(RiLogoutCircleRLine)`
    font-size: 30px;
    cursor: pointer;
    color: #fff;
    margin-right: 30px;
`

const NavDiv = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: #434343;
    background-color: #4285F4;
    height: 60px;
    box-shadow: 0 0px 30px -6px rgba(0,0,0,0.9);
    z-index: 5;
    & span {
        // color: #fff;
    }
    transition-duration: 1s;
    .user {
        font-size: 30px;
        cursor: pointer;
        display: flex;
        width: fit-content;
        align-items: center;
        // color: ${props => props.active === "user" ? "#" : "#fff"};
        color: #fff;
        // font-weight: ${props => props.active === "user" && 700}
        & span {
            margin-right: 5px;
            font-weight: ${props => props.active === "user"? "650" : null};
        }
    }
    .team {
        font-size: 30px;
        cursor: pointer;
        display: flex;
        width: fit-content;
        align-items: center;
        color: #fff;
        & span {
            margin-right: 5px;
            font-weight: ${props => props.active !== "user"? "650" : null};
        }
    }
    .logout {
        cursor: pointer;
        display: flex;
        width: fit-content;
        align-items: center;
        color: white;
        font-size: 30px;
        & span {
            margin-right: 5px;
        }
    }
`

export default NavBar
