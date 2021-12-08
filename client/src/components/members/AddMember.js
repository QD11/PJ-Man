import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {RiFileAddLine, RiUserAddFill, RiUserAddLine} from 'react-icons/ri'
import { v4 as uuid } from "uuid";

const AddMember = () => {
    const team = useSelector(state => state.team)
    const [recruitResp, setRecruitResp] = useState("")
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')

    useEffect(() => {
        setCode(uuid)
    }, [modal])

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
        .then((r) => {
            if (r.ok) {
                r.json()
                .then(data => setRecruitResp("Success! Make sure to send this code!"))
            } else {
                r.json().then((err) => setRecruitResp(err.errors));
            }})
    }

    ///
    const toggleModal = () => {
        setModal(!modal);
    };

    if(modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    return (
        <>
            <motion.div className="btn-div">
                {/* <RiFileAddLine/>
                <ItemSpan> Add Project</ItemSpan> */}
                <AddMemberIcon onClick={toggleModal}/>
            </motion.div>
            {modal && 
                <ModalDiv className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <form className="container" onSubmit={handleSubmit}>
                            <p>This will generate a unique code for your member to join this team. This code is specifically tied to the provided email.</p>
                            <EmailDiv>
                                <label for="email-input">Email:</label>
                                <input autoComplete="off" type="email" id="email-input" name="email" onChange={(e) => setEmail(e.target.value)}/>
                            </EmailDiv>
                            <div>
                                {/* <label> Code:  </label> */}
                                <span> {code} </span>
                            </div>
                            <button type="submit">Submit</button>
                            <span>{recruitResp}</span>
                        </form>
                        <button className="close-modal" onClick={toggleModal}>
                            CLOSE
                        </button>
                    </div>
                </ModalDiv>}
                {/* </CreateDiv> */}
        </>
    )
}

const InputMotion = styled(motion.input)`
    background-color: ${props => props.priority === "low" ? "#b3ffe5" : props.priority === "medium"? "#b7cbfb": "#fdb4b4"};
    font-size: 30px;
`

const SubmitMotion = styled(motion.button)`
    font-size: 30px;
`

const ItemSpan = styled(motion.span)`
    font-weight: bold;
    font-weight: 500;
    // margin-bottom: -10px;
`

const AddMemberIcon = styled(RiUserAddFill)`
    // position: absolute;
    margin-right: 100px;
    font-size: 60px;
    cursor: pointer;
    color: #253858;
`

const CreateDiv = styled(motion.div)`
    flex-direction: column;
    display:flex;
    width: 100%;
    justify-content: flex-end;
    z-index: 2;
    // position: absolute;
    // top: 72px;
    // left: 950px;
    // margin-bottom: 20px;
    // font-size: 25px;
    // height: fit-content;
    // cursor: pointer;
    // border-radius: 10px;
    // padding: 10px 10px;
    // box-shadow: 0 0px 20px -6px rgb(0 0 0 / 70%);
    // background: rgb(248 248 248 / 100%);
    .btn-div {
        display:flex;
        justify-content: flex-end;
    }
`


const ModalDiv = styled.div`
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
    z-index: 3;
    .overlay {
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: fixed;
        background: rgba(49,49,49,0.8);
    }

    .modal-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1.4;
        background: #f1f1f1;
        padding: 14px 28px;
        border-radius: 3px;
        // max-width: 600px;
        // min-width: 300px;
        width: 500px;
    }

    .close-modal {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 7px;
    }

    .container {
        height: fit-content;
        width: fit-content;
        padding: 50px;
        font-size: 30px;
        & span {
            display: inline-block;
            min-width: 220px;
        }
        .prio-div {
            margin-top: 20px;
            .prio-drop {
                font-size: 30px;
            }
            
        }
        .btn-div {
            display: flex;
            margin-top: 20px;
            // margin-bottom: 20px;
            .btn {
                // font-size: 30px;
            }
        }
    }
`

const EmailDiv = styled(motion.div)`
    display: flex;
    & input {
        margin-left: 5px;
        width: 100%;
    }
`


export default AddMember

