import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {getTeam} from '../../../../../redux/teamSlice'
// import "./styles.css";

const Handle = ({ text, isOn, completed }) => (
    <div className="option">
        <div className={`text ${isOn ? "active" : null}`}>{text}</div>
        
        {isOn && (
        <HandleDiv
            completed={completed}
            className="handle"
            layoutId="handle"
            animate={{ borderRadius: "40px" }}
            transition={{
            type: "spring",
            stiffness: 600,
            damping: 50
            }}
        />
        )}
    </div>
);

export default function TaskToggle({taskInfo}) {
    const dispatch = useDispatch()
    const team = useSelector(state => state.team)
    const isAdmin = useSelector(state => state.isAdmin)
    const [isOn, setIsOn] = useState(taskInfo.completed);
    
    const handleClick = () => {
        if (isAdmin) {
        setIsOn(isOn => !isOn)


        fetch(`/${taskInfo.id}/status_update`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"
            },
            body: JSON.stringify({completed: !isOn, team_id: team.id, completed_date: new Date()}) 
        })
        .then(resp => {
            if (resp.ok) {
                resp.json()
                .then(data => {
                    dispatch(getTeam(data))})}})
        }
    }
    
    return (
        <ToggleDiv >
        <AnimateSharedLayout type="crossfade">
            <button className="switch" type="button" onClick={handleClick }>
            <div className="inner">
                <Handle text="Ongoing" isOn={!isOn} completed={false}/>
                <Handle text="Completed" isOn={isOn} completed={true}/>
            </div>
            </button>
        </AnimateSharedLayout>
        </ToggleDiv>
    );
}

const HandleDiv = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background-color: ${props => props.completed ? "green" : "red"};
    // background-color: white;
    border-radius: 40px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 4px 4px 16px 0 rgba(0, 0, 0, 0.1);
`

const ToggleDiv = styled.div`
    box-shadow: 0 0px 15px -8px rgb(0 0 0 / 50%);
    border-radius: 40px;
    .switch {
        font-family: "Open Sans", sans-serif;
        display: flex;
        padding: 2px 0;
        cursor: pointer;
        text-align: left;
        padding: 0;
        width: auto;
        appearance: none;
        border: none;
        background-color: transparent;
        outline: 0;
    }

    
    .inner {
        background-color: rgba(255, 255, 255, 0.5);
        display: flex;
        align-items: stretch;
        border-radius: 40px;
    }

    .option {
        display: flex;
        align-items: center;
        position: relative;
    }

    .text {
        font-size: 20px;
        font-weight: 700;
        line-height: 5px;
        white-space: nowrap;
        color: rgba(0, 0, 0, 0.5);
        position: relative;
        padding: 20px 20px;
        z-index: 1;
        transition: ease 200ms color;
    }

    .active {
        // color: #000;
        color: white;
        // color: red;
    }

    // .handle {
    //     width: 100%;
    //     height: 100%;
    //     position: absolute;
    //     left: 0;
    //     right: 0;
    //     top: 0;
    //     background-color: white;
    //     border-radius: 40px;
    //     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05), 4px 4px 16px 0 rgba(0, 0, 0, 0.1);
    // }
`