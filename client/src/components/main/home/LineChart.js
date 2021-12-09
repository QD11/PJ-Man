import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
import { Line } from 'react-chartjs-2';
import {parseISO} from 'date-fns'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const team = useSelector(state => state.team)
    const [weekTasks, setWeekTasks] = useState([])

    useEffect(() => {
        fetch(`/teams/${team.id}/tasks_week`)
        .then(resp => resp.json())
        .then(data => setWeekTasks(data))
    }, [team])

    const completedCount = [0,0,0,0,0,0,0]
    weekTasks.forEach(task => completedCount[(parseISO(task.completed_date).getDay())] += 1)
    
    const data = {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
            {
                label: 'Completed Tasks This Week',
                data: completedCount,
                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                // 'red',
                // 'rgba(75, 192, 192, 0.5)',
                // 'green',
                ],
                borderColor: [
                'rgba(255, 99, 132, 1)',
                // 'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
            ],
        } 
    
        const options = {
            scales: {
                // beginAtZero: true,
                y: {
                    

                    // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
                    // max: dataMax + 1,
                    
                    beginAtZero: true,
                    ticks: {
                        // forces step size to be 50 units
                        stepSize: 1
                    }
                }
            },
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
                scales: {
                    beginAtZero: true,
                },
                legend: {
                    labels: {
                        // This more specific font property overrides the global property
                        display: false,
                        font: {
                            size: 15
                        }
                    }
                },
                title: {
                    display: false,
                    text: 'Spending',
                    font: {
                        size: 40
                    }
                }
            }
            }


    return (
        <>
            <Line options={options} data={data} width={500} height={400}/>
        </>
    )
}

export default LineChart
