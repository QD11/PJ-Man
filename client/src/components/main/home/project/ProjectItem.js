import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {motion, AnimatePresence} from 'framer-motion'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {BsThreeDots} from 'react-icons/bs'
import {RiDeleteBin2Line, RiArchiveLine} from 'react-icons/ri'
import {getAllProjects} from '../../../../redux/projectSlice'
import {getTeam} from '../../../../redux/teamSlice'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import Avatar from 'react-avatar'

const ProjectItem = ({project}) => {
    const dispatch = useDispatch()
    const [option, setOption] = useState(false)
    const [respMsg, setRespMsg] = useState(null)
    const team = useSelector(state => state.team)
    const isAdmin = useSelector(state => state.isAdmin)
    const [updateForm, setUpdateForm] = useState({
        name: project.name,
        priority: project.priority,
        team_id: team.id
    })
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
                .then(data => dispatch(getTeam(data)))
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
    const abc = project.sections.map(section => section.tasks).forEach(c => c.forEach(d => tasks.push(d)))
    tasks.forEach(task => task.team_users.forEach(a => teamUsers.push(a)))
    function unique(array, propertyName) {
        return array.filter((e, i) => array.findIndex(a => a[propertyName] === e[propertyName]) === i);
    }
    const uniqueTeamUsers = unique(teamUsers, 'id')
    
    return (
        <>
        {/* <ProjectLI priority={project.priority}>
            <div className="card card-top-right" onClick={handleClick}>
                <div className="card-inner">
                    <TitleDiv>
                            { isAdmin && <DotsDiv
                                onClick={e => e.stopPropagation()}
                            >
                                <DotsIcon onClick={e => {
                                    e.stopPropagation()
                                    setOption(option => !option)
                                }}/>
                                <AnimatePresence initial={false}>
                                    {option && <DotsForm
                                            onSubmit={updateSubmit}
                                            autocomplete="off"
                                            initial="collapsed"
                                            animate="open"
                                            exit="collapsed"
                                            variants={{
                                                open: { opacity: 1, width: "auto", height: 110,
                                                    transition:{ 
                                                        duration: 0.3, 
                                                        ease: [0.04, 0.62, 0.83, 0.99],
                                                    }},
                                                collapsed: { opacity: 0, width: 0, height: 0,
                                                    transition:{ 
                                                        duration: 0.3, 
                                                        ease: [0.04, 0.82, 0.83, 0.99],
                                                        delay: 0.1,
                                                    }
                                                }
                                            }}
                                        >
                                            <NameMotion onChange={updateChange} type="text" autocomplete="off" value={updateForm.name} name="name"></NameMotion>
                                            <PriorityUpdateDiv>
                                                <div>
                                                    <label>Priority: </label>
                                                    <motion.select autocomplete="off" onChange={updateChange} name="priority" defaultValue={updateForm.priority} name="priority">
                                                        <option value="low">Low</option>
                                                        <option value="medium">Med</option>
                                                        <option value="high">High</option>
                                                    </motion.select>
                                                </div>
                                                <UpdateBut type="submit">Update</UpdateBut>
                                            </PriorityUpdateDiv>
                                            <DelDiv>
                                                <ArchiveIcon onClick={() => console.log("QQQQ")}/>
                                                <span>{respMsg}</span>
                                                <DelIcon onClick={deleteProject}/>
                                            </DelDiv>
                                        </DotsForm>
                                    }   
                                </AnimatePresence>
                            </DotsDiv>}
                    </TitleDiv>
                    <h2 className="card-title">{project.name}</h2>
                    <div className="card-body">
                        <span>Show priority</span>
                        <div>
                            <span>Tasks #/#</span>
                        </div>
                        <div>
                            <span>Members?</span>
                        </div>
                    </div>
                </div>
            </div>
        </ProjectLI> */}
        <CardLi priority={project.priority} onClick={handleClick}>
            <div className="priority-dots">
                <SpanPriority priority={project.priority} >Priority: {project.priority.slice(0,1).toUpperCase() + project.priority.slice(1)}</SpanPriority>
                <BsThreeDots />
            </div>
            <div className="content">
                <div>
                    <h1>{project.name}</h1>
                    {uniqueTeamUsers.map(teamUser => 
                            <Avatar key={teamUser.user.id}  src={teamUser.user.profile_picture_url} name={teamUser.user.first_name + ' ' +  teamUser.user.last_name} round={true} size="40" textSizeRatio={1.75}/>
                        )}
                </div>
                <div className="chart-div" >
                <CircularProgressbarWithChildren value={66}
                    styles={buildStyles({
                        // textSize: '16px',
                        rotation: 0.5 + (1 - 66 / 100) / 2,
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
                        <strong >66%</strong>
                    </div>
                </CircularProgressbarWithChildren>
                </div>
            </div>
        </CardLi>
        </>
    )
}

const SpanPriority = styled.span`
    font-size: 18px;
    color: ${props => props.priority === "low" ? "#4caf50" : props.priority === "medium"? "#03a9f4": "#f44336"};
`

const CardLi = styled.li`
    font-family: Quarion, sans-serif;
    list-style: none;
    margin-bottom: 70px;
    margin-right: 100px;
    padding: 0;
    background-color:#fff;
    border-radius: 20px;
    padding: 20px;
    width: 400px;
    height: fit-content;
    // box-shadow: -10px 0px 0px 0px #fba609;
    box-shadow: -10px 0px 0px 0px ${props => props.priority === "low" ? "#4caf50" : props.priority === "medium"? "#03a9f4": "#f44336"};
    transition: 0.2s;
    &:hover {
        box-shadow: -20px 0px 0px 0px ${props => props.priority === "low" ? "#4caf50" : props.priority === "medium"? "#03a9f4": "#f44336"};
    }
    .priority-dots {
        display:flex;
        justify-content: space-between;
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
    }
`

/////////////////////////////////

const UpdateBut = styled.button`
    // margin-top: 5px;
    // margin-left: 10px;
    font-size: 20px;
`

const PriorityUpdateDiv = styled(motion.div)`
    margin-top: 5px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
}
`
const DelIcon = styled(RiDeleteBin2Line)`
    transition: transform .2s;
    color: red;
    &:hover {
        transform: scale(1.5);
    }
`

const ArchiveIcon = styled(RiArchiveLine)`
    transition: transform .2s;
    &:hover {
        transform: scale(1.5);
    }
`

const DotsIcon = styled(BsThreeDots)`
    transition: transform .2s;
    &:hover {
        transform: scale(1.5);
    }
`


const DelDiv = styled(motion.div)`
    display: flex;
    justify-content: space-between;
`

const NameMotion = styled(motion.input)`
    width: 200px;
`

const DotsForm = styled(motion.form)`
    width: fit-content;
`

const FormDiv = styled(motion.form)`
    // position: relative;
`

const DotsDiv = styled(motion.div)`
    position: absolute;
    // right: 40px;
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    // width: fit-content;
    height: fit-content;
    outline: 1px solid #e2d9d5;
    z-index: 2;
    padding: 5px;
    background-color: #ffe0a8;
    border-radius: 5px;
`

const TitleDiv = styled.div`
    display:flex;
    justify-content: flex-end;
`

const ProjectLI = styled(motion.li)`
    height: 265px;
    width: 250px;
    list-style: none;
    margin-right: 80px;
    // box-shadow: 0 0px 20px -6px rgb(127 0 231)
`


export default ProjectItem
