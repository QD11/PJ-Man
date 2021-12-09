import React, {useState, useEffect} from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {useSelector} from 'react-redux'
import styled from 'styled-components'

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({donutOption}) => {
    const team = useSelector(state => state.team)
    const [allTasks, setAllTasks] = useState([])

    //project
    const numProjectCompleted = team.projects.filter(project => project.completed).length
    const completedProjArray = [team.projects.length - numProjectCompleted, numProjectCompleted]

    //task
    useEffect(() => {
        fetch(`/teams/${team.id}/tasks`)
        .then(resp => resp.json())
        .then(data => setAllTasks(data))
    }, [team])
    
    const tasksCompleted = allTasks.filter(task => task.completed).length
    const completedTaskArray = [allTasks.length - tasksCompleted, tasksCompleted]


    const dateObj = new Date()
    const monthName = dateObj.toLocaleString("default", { month: "long" })  
    const yearName = new Date().getFullYear();

    const data = (donutOption === "project" || donutOption === "task" ) && {
        labels: ['Not Completed', 'Completed'],
        datasets: [
            {
                label: '# Completed',
                data: donutOption === "project" ? completedProjArray : completedTaskArray,
                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                // 'red',
                'rgba(75, 192, 192, 0.5)',
                // 'green',
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
            ],
        } 


    const options = {
        maintainAspectRatio: true,
        responsive: true,
        elements: {
            // center: {
            //     legend: { display: true, position: "right" },
            //     text: "Red is 2/3 the total numbers",
            //     color: "#FF6384", // Default is #000000
            //     fontStyle: "Arial", // Default is Arial
            // }
        },
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: false,
                text: 'Completion',
                font: {
                    size: 11
                }
            }
        }
        }

    return (
        <div>
            <Doughnut data={data}  options={options} height={400} width={400}/>
        </div>
    );
}

const DonutDiv = styled.div`
    
    // width: fit-content;
    // height: fit-content;
`

export default DonutChart
