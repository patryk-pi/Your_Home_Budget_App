import React, {useContext} from 'react';
import {Pie} from 'react-chartjs-2';
import {AppContext} from '../../context/AppProvider';

import {Chart, ArcElement, Colors, Tooltip} from 'chart.js'

Chart.register(ArcElement, Colors, Tooltip)

const PieChart = ({transaction}) => {
    const {operations, filterOperationsByMonth} = useContext(AppContext);





    // Format data for Pie chart
    const categories = [...new Set(operations.map(({category}) => category))];


    const data = {
        labels: categories,
        datasets: [
            {
                label: 'Zł',
                data: categories.map(category =>
                    operations
                        .filter(operation => filterOperationsByMonth(operation))
                        .filter(operation => operation.category === category)
                        .filter(({amount}) => transaction === 'income' ? amount > 0 : amount < 0)
                        .reduce((sum, {amount}) => sum + amount, 0)
                ),
              /*  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#00FF00'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#00FF00'],*/
            },
        ],
    };

    const tooltipLabelCallback = (tooltipItem) => {
        const label = data.labels[tooltipItem.index];
        const value = data.datasets[0].data.find((obj) => obj.label === label)?.value ?? 0;
        return `${label}: ${value} Zł`;
    };


    const options = {
        plugins: {
            tooltip: {
                enabled: true,
                mode: 'index',
                callbacks: {
                    label: tooltipLabelCallback,
                },
            },
        },
    };


    if (data.datasets[0].data.every(sum => sum === 0)) {
        return (
            <>
                <h1>Brak danych dotyczących {transaction === 'income' ? 'wpływów' : 'wydatków'} :(</h1>
            </>
        )
    }

    return <Pie data={data} options={options}/>;
};

export default PieChart;
