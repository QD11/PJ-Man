import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {motion} from 'framer-motion'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {BsThreeDots} from 'react-icons/bs'
import {RiCloseCircleFill} from 'react-icons/ri'
import {getTeam} from '../../../../redux/teamSlice'
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import Avatar from 'react-avatar'

const ProjectItem = ({project}) => {
    const dispatch = useDispatch()
    const [respMsg, setRespMsg] = useState(null)
    const team = useSelector(state => state.team)
    const isAdmin = useSelector(state => state.isAdmin)
    const [updateForm, setUpdateForm] = useState({
        name: project.name,
        priority: project.priority,
        team_id: team.id,
        completed: project.completed,
    })
    const [cardForm, setCardForm] = useState(0)

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`${project.id}`)
    }

    const updateChange = (e) => {
        setUpdateForm({
            ...updateForm,
            [e.target.name] : e.target.value
        })
    }

    useEffect(() => {
        setUpdateForm({
            ...updateForm,
            name: project.name,
            priority: project.priority
        })
    }, [cardForm])

    const updateSubmit = (e) => {
        e.preventDefault()
        fetch(`/projects/${project.id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"
            },
            body: JSON.stringify(updateForm) 
        })
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {
                    dispatch(getTeam(data))
                    setCardForm(0)
                })
            }
            else {
                resp.json()
                .then(err => setRespMsg(err.errors))
            }
        })  
    }

    const deleteProject = () => {
        fetch(`/projects/${project.id}`, {
            method: "DELETE",
        })
        .then(resp => resp.json())
        .then(data => dispatch(getTeam(data)))
    }

    //all this to find members in each category
    const tasks = []
    const teamUsers = []
    project.sections.map(section => section.tasks).forEach(c => c.forEach(d => tasks.push(d)))
    tasks.forEach(task => task.team_users.forEach(a => teamUsers.push(a)))
    function unique(array, propertyName) {
        return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
    }
    const uniqueTeamUsers = unique(teamUsers, 'id')
    const completedTasks = `${(tasks.filter(task => task.completed === true).length)}/${tasks.length}`
    const completedTasksPercent = 100 * (tasks.filter(task => task.completed === true).length/tasks.length ? tasks.filter(task => task.completed === true).length/tasks.length : 0)
    
    return (
        <CardLi priority={project.priority}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.2,
            }}
        >
            {cardForm === 0 && 
                <>
                    <div className="priority-dots">
                        <SpanPriority priority={project.priority} >Priority: {project.priority.slice(0,1).toUpperCase() + project.priority.slice(1)}</SpanPriority>
                        <span>{project.completed ? "Completed" : "Ongoing" }</span>
                        {isAdmin && <BsThreeDots onClick={() => setCardForm(1)}/>}
                    </div>
                    <div className="content">
                        <div>
                            <h2 onClick={handleClick} className="project-name" >{project.name}</h2>
                            <div className="avatar-div">
                                {uniqueTeamUsers.length < 5 ? uniqueTeamUsers.map(teamUser => 
                                        <Avatar key={teamUser.user.id}  src={teamUser.user.profile_picture_url} name={teamUser.user.first_name + ' ' +  teamUser.user.last_name} round={true} size="40" textSizeRatio={1.75}/>
                                    )
                                :
                                    <>
                                        {uniqueTeamUsers.slice(0,4).map(teamUser => 
                                            <Avatar key={teamUser.user.id}  src={teamUser.user.profile_picture_url} name={teamUser.user.first_name + ' ' +  teamUser.user.last_name} round={true} size="40" textSizeRatio={1.75}/>
                                        )}
                                        <span>...</span>
                                    </>
                                }
                            </div>
                        </div>
                        <div className="chart-div" >
                            <CircularProgressbarWithChildren value={completedTasksPercent}
                                styles={buildStyles({
                                    // textSize: '16px',
                                    // rotation: 0.5 + (1 - 66 / 100) / 2,
                                    pathTransitionDuration: 0.5,
                                    pathTransition: 'none',
                                    pathColor: `#fba609`,
                                    pathColor: project.priority === "low" ? "#4caf50" : project.priority === "medium"? "#03a9f4": "#f44336",
                                    // textColor: '#fba609',
                                    trailColor: '#d6d6d6',
                                    // verticalAlign: "middle",
                                    })}
                                    >
                                <div className="text-chart">
                                    <strong >{completedTasks === '0/0' ? 'N/A' : completedTasks }</strong>
                                </div>
                            </CircularProgressbarWithChildren>
                        </div>
                    </div>
                </>}
            {cardForm === 1 &&
            <OptionDiv>
                <div className="option-div">
                    <RiCloseCircleFill className="close" onClick={() => setCardForm(0)}/>    
                </div>
                <div className="option-menu">
                    <button onClick={() => setCardForm(2)}>Edit Project</button>
                    <button onClick={deleteProject} >Delete</button>
                </div>
            </OptionDiv>
            }
            {cardForm === 2 &&
            <OptionDiv>
                <div className="option-div">
                    <RiCloseCircleFill className="close" onClick={() => setCardForm(0)}/>    
                </div>
                <form className="edit-form" onSubmit={updateSubmit}>
                    <div className="edit-input">
                        <span>Name: </span>
                        <input value={updateForm.name} type="text" name="name" onChange={e => updateChange(e)}/>
                    </div>
                    <div className="edit-input">
                        <span>Priority: </span>
                        <select value={updateForm.priority} name="priority" onChange={e => updateChange(e)}>
                            <option value="low">Low</option>
                            <option value="medium">Med</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <button type="submit" disabled={!updateForm.name}>Submit</button>
                </form>
            </OptionDiv>
            }
        </CardLi>
    )
}

const OptionDiv = styled.div`
    height: 100%;
    .option-div {
        display:flex;
        justify-content: flex-end;
        .close {
            cursor: pointer;
        }
    }
    .option-menu {
        justify-content: space-evenly;
        display:flex;
        height: 100%;
        flex-direction: column;
        align-items: center;
        & button {
            border: 0;
            outline: 0;
            cursor: pointer;
            color: rgb(60,66,87);
            background-color: rgb(255,255,255);
            box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
            border-radius: 4px;
            font-size: 20px;
            font-weight: 500;
            padding: 4px 8px;
            display: inline-block;
            min-height: 28px;
            -webkit-transition: background-color .24s,box-shadow .24s;
            transition: background-color .24s,box-shadow .24s;
        }
    }
    .edit-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        justify-content: space-evenly;
        & span {

            width: 80px;
        }
        .edit-input {
            margin-left: 200px;
            display: flex;
            width: 100%;
            justify-content: flex-start;
            & input, select {
                // font-size: 18px;
                width: 150px;
                padding: 7px;
                border-radius: 6px;
                background: #fbfbfb;
                border: 2px solid transparent;
                height: fit-content;
                box-shadow: 0 0 0 1px #dddddd, 0 2px 4px 0 rgb(0 0 0 / 7%), 0 1px 1.5px 0 rgb(0 0 0 / 5%);
                :focus{
                    border: 2px solid #000;
                    border-radius: 4px;
                }
            }
        }
        & span {
            font-size: 20px;
            // width: 200px;
        }
        & button {
            // padding: 5px;
            width: fit-content;
            // button {
                border: 0;
                outline: 0;
                cursor: pointer;
                color: rgb(60,66,87);
                background-color: rgb(255,255,255);
                box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
                border-radius: 4px;
                font-size: 20px;
                font-weight: 500;
                padding: 4px 8px;
                display: inline-block;
                min-height: 28px;
                -webkit-transition: background-color .24s,box-shadow .24s;
                transition: background-color .24s,box-shadow .24s;
    }
    }
    & button {
        width: 300px;
    }
`

const SpanPriority = styled.span`
    font-size: 18px;
    color: ${props => props.priority === "low" ? "#4caf50" : props.priority === "medium"? "#6ac9f4": "#f44336"};
`

const CardLi = styled(motion.li)`
    // font-family: Quarion, sans-serif;
    list-style: none;
    margin-bottom: 70px;
    margin-right: 100px;
    background-color:#fff;
    border-radius: 20px;
    padding: 20px;
    width: 400px;
    height: 140px;
    // box-shadow: -10px 0px 0px 0px #fba609;
    box-shadow: -10px 0px 0px 0px ${props => props.priority === "low" ? "#93d36b" : props.priority === "medium"? "#6ac9f4": "#f0ada8"};
    transition: 0.5s;
    &:hover {
        box-shadow: -14px 0px 0px 0px ${props => props.priority === "low" ? "#93d36b" : props.priority === "medium"? "#6ac9f4": "#f0ada8"};
    }
    .priority-dots {
        display:flex;
        justify-content: space-between;
        cursor: pointer;
    }
    .avatar-div{
        display: flex;
        align-items: flex-end;
    }
    .content {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .chart-div {
            width: 120px;
            height: 120px;
            .text-chart {
                font-size: 30px;
            }
        }
        .project-name {
            cursor: pointer;
            width: fit-content; 
            font-size: 40px;
            margin-block-start: 0.25em;
            margin-block-end: 0.25em;
        }
    }
`

/////////////////////////////////


export default ProjectItem
