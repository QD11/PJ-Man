import React, {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import {getTeam} from '../../redux/teamSlice'
import {useDispatch} from 'react-redux'
import {BsChevronDoubleDown, BsChevronDoubleUp} from 'react-icons/bs'
import {ImEnter} from 'react-icons/im'
// import { removeMemberFromTeam } from '../../redux/teamSlice'

const TeamCard = ({team}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => setIsOpen(!isOpen);

    const handleClick = () => {
        fetch("/team_login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                },
            body: JSON.stringify({team_id: team.id}),
        })
        .then(resp => resp.json())
        .then(team => {
            dispatch(getTeam(team))
            navigate(`/${team.name}`)
        })
    }

    return (
        <>
            <MotionCard initial={false} className="team-card">
                <div className="init">
                    <motion.span className="team-name"> {team.name}</motion.span>
                    {/* <button className="enter" onClick={handleClick}>Enter</button> */}
                    < EnterTeam onClick={handleClick}/>
                    {/* <Avatar name={team.name} round={true} size="120" textSizeRatio={1.75}/> */}
                </div>
                {isOpen === false && <div className="click" onClick={toggleOpen}>
                    <span>Click for More</span>
                    < BsChevronDoubleDown />
                </div>}
                {isOpen === true && <div className="click" onClick={toggleOpen}>
                    < BsChevronDoubleUp />
                    <span>Close</span>
                </div>}
                <AnimatePresence initial={false}>
                    {isOpen && <motion.section
                        className="open-section"
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                        open: { opacity: 1, height: "auto" },
                        collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.83, 0.98] }}
                    >
                        <Content team={team}/>
                    
                    </motion.section>
                    }
                </AnimatePresence>
            </MotionCard>
        </>
    )
}

function Content({team}) {
    const sortArray = (x, y) =>{
        if (x.last_name < y.last_name) {return -1;}
        if (x.last_name > y.last_name) {return 1;}
        return 0;
    }

    const orderedUsers = team.users.sort(sortArray)

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <MotionSpan>{team.description}</MotionSpan>
            <AvatarContainer>
                {orderedUsers.map(user => <li key={user.id}>{<Avatar src={user.profile_picture_url} name={user.first_name + ' ' +  user.last_name} round={true} size="60" textSizeRatio={1.75}/>}</li>)}
            </AvatarContainer>
        </motion.div>
        );
}

const EnterTeam = styled(ImEnter)`
    font-size: 80px;
    cursor: pointer;
`

const AvatarContainer = styled.ul`
    display: flex;
    margin-top: 20px;
    & li {
        list-style: none;
        margin-right: 10px;
    }
`

const MotionCard = styled(motion.li)`
    display: flex;
    align-items: center;
    // justify-content: space-between;
    flex-direction: column;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #fff;
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 20%);
    width: 60%;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 50px;
    overflow: hidden;
    // cursor: pointer;
    .init {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
    }
    .team-name {
        font-size: 100px;
    }
    .click {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: grey;
        cursor: pointer;
    }
    &: last-child {
        margin-bottom: 0px;
    }
    .enter {
        height: fit-content;
    }
    .open-section {
        width: 100%;
        display: flex;
        & span {
            font-size: 25px;
            flex-wrap: wrap;
        }
    }
`

const MotionSpan = styled(motion.span)`
    width: 100%;
    height: 8px;
    // background-color: #999;
    border-radius: 10px;
    margin-top: 12px;
    margin-bottom: 25px;
`

export default TeamCard
