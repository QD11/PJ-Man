import React, {useState} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import styled from 'styled-components'
import Avatar from 'react-avatar'
import { useNavigate } from 'react-router-dom'
import {getTeam} from '../../redux/teamSlice'
import {useDispatch} from 'react-redux'

const TeamCard = ({team}) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggleOpen = () => setIsOpen(!isOpen);


    return (
        <>
            <MotionCard onClick={toggleOpen} initial={false}>
                <Avatar name={team.name} round={true} size="80" textSizeRatio={1.75}/>
                <motion.span> {team.name}</motion.span>
                <AnimatePresence initial={false}>
                    {isOpen && <motion.section
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
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sortArray = (x, y) =>{
        if (x.last_name < y.last_name) {return -1;}
        if (x.last_name > y.last_name) {return 1;}
        return 0;
    }

    const orderedUsers = team.users.sort(sortArray)

    const handleClick = () => {
        // fetch("/org_login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         },
        //     body: JSON.stringify({organization_id: organization.id}),
        // })
        // .then(resp => resp.json())
        // .then(org => {
            dispatch(getTeam(team))
            navigate(`/${team.name}`)
        // })
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <AvatarContainer>
                {orderedUsers.map(user => <div key={user.id}>{<Avatar name={user.first_name + ' ' +  user.last_name} round={true} size="20" textSizeRatio={1.75}/>}</div>)}
            </AvatarContainer>
            <MotionSpan>{team.description}</MotionSpan>
            <button onClick={handleClick}>Enter</button>
        </motion.div>
        );
}
const AvatarContainer = styled.div`
    display: flex;
`

const MotionCard = styled(motion.div)`
    margin: 0;
    padding: 0;
    background-color: rgba(214, 214, 214, 0.5);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    cursor: pointer;
    &: last-child {
        margin-bottom: 0px;
    }
`

const MotionSpan = styled(motion.span)`
    width: 100%;
    height: 8px;
    // background-color: #999;
    border-radius: 10px;
    margin-top: 12px;
`

export default TeamCard
