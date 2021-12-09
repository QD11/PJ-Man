import React, {useState} from 'react'
import DonutChart from './DonutChart'
import LineChart from './LineChart'
import styled from 'styled-components'

const Dashboard = () => {
    const [donutOption, setDonutOption] = useState("project")
    
    

    return (
        <>
        <DonutDiv>
            <DonutChart donutOption={donutOption}/>
            <div className="buttons">
                <button className={donutOption==="project" ? "active" : null } onClick={() => setDonutOption("project")}>Projects</button>
                <button className={donutOption==="task" ? "active" : null } onClick={() => setDonutOption("task")}>Tasks</button>
            </div>
        </DonutDiv>
        <LineDiv>
            <LineChart />
        </LineDiv>
        </>
    );
}

const LineDiv = styled.div`
    margin-top: 10px;
    display: flex;
    border-radius: 20px;
    height: fit-content;
    width: fit-content;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 20%);
    margin-left: 40px;
`


const DonutDiv = styled.div`
    margin-top: 10px;
    display: flex;
    border-radius: 20px;
    height: fit-content;
    width: fit-content;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0px 20px -6px rgb(0 0 0 / 20%);
    .buttons {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .active {
            background-color: #253858;
            color: #fff;
        }
        & button {
            border: 0;
            outline: 0;
            cursor: pointer;
            color: rgb(60, 66, 87);
            background-color: rgb(255, 255, 255);
            box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
            border-radius: 4px;
            font-size: 20px;
            font-weight: 500;
            padding: 4px 8px;
            display: inline-block;
            min-height: 28px;
            transition: background-color .24s,box-shadow .24s;
            margin: 10px;
            &:hover {
                box-shadow: rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(0 0 0 / 12%) 0px 1px 1px 0px, rgb(60 66 87 / 16%) 0px 0px 0px 1px, rgb(0 0 0 / 0%) 0px 0px 0px 0px, rgb(60 66 87 / 8%) 0px 3px 9px 0px, rgb(60 66 87 / 8%) 0px 2px 5px 0px;
            }
    }
    }

`

export default Dashboard
