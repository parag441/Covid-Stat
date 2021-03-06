import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';
import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, recovered, deaths }, country }) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        
        fetchAPI();
    }, []);

    const lineChart = (
        dailyData.length
            ? (
                <Line 
                    data={{
                        labels: dailyData.map(({ date }) => date),
                        datasets: [{
                            data: dailyData.map(({ confirmed }) => confirmed),
                            label: 'Infected',
                            borderColor: 'blue',
                            backgroundColor: '#dac4ea',
                            fill: true 
                        }, {
                            data: dailyData.map(({ deaths }) => deaths),
                            label: 'Deaths',
                            borderColor: 'red',
                            backgroundColor: '#ecbfbf',
                            fill: true 
                        }]
                    }}
                />) : null
    );

    const pieChart = (
      confirmed
        ? (
            <Doughnut 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        // label: 'People',
                        backgroundColor: [
                            'rgba(0, 0, 255, 0.5)',
                            'rgba(8, 231, 56, 0.5)',
                            'rgba(255, 0, 0, 0.5)'
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }],
                }}
                options={{
                    legend: { display: true },
                    title: { display: true, text: `Current state in ${country}` }
                }}
            />
        ) : null   
    );

    return (
        <div className={styles.container}>
            {country? pieChart : lineChart}
        </div>
    )
}

export default Chart;