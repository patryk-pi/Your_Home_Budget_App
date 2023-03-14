import React, { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { AppContext } from '../../context/AppProvider';
import { Chart, ArcElement, Colors, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Colors, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ graphStyle, transaction }) => {
    const { operations, filterOperationsByMonth } = useContext(AppContext);

    // Filter transactions by income or expense
    const filteredOperations =
        transaction === 'income'
            ? operations.filter(({ amount }) => amount > 0)
            : operations.filter(({ amount }) => amount < 0)



    // Format data for Pie chart
    const categories = [...new Set(filteredOperations.map(({ category }) => category))];

    const data = {
        labels: categories,
        datasets: [
            {
                label: 'PLN',
                data: categories.map(
                    (category) =>
                        filteredOperations
                            .filter((operation) => filterOperationsByMonth(operation))
                            .filter((operation) => operation.category === category)
                            .reduce((sum, { amount }) => sum + amount, 0)
                ),
                /*  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#00FF00'],
                          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#00FF00'],*/
            },
        ],
    };

    const tooltipLabelCallback = (tooltipItem) => {
        const label = tooltipItem.label;
        const value = tooltipItem.parsed;
        return `${label}: ${Math.abs(value)} PLN`;
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    // Filter labels to only show those rendered in the chart
                    filter: (label, index) => data.datasets[0].data[index] !== 0,
                },
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                callbacks: {
                    label: tooltipLabelCallback,
                },
            },
            datalabels: {
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data.reduce((acc, cur) => acc + cur);
                    const percentage = ((value / total) * 100).toFixed(0) + '%';
                    return value === 0 ? '' :percentage;
                },
                color: 'white',
                font: {
                    weight: 700,
                    size: 14
                }
            },
        },
    };

    if (data.datasets[0].data.every((sum) => sum === 0)) {
        return (
            <>
                <h1>Brak danych dotyczących {transaction === 'income' ? 'wpływów' : 'wydatków'} :(</h1>
            </>
        );
    }

    return (
        <>
            <Pie style={graphStyle} data={data} options={options} />
        </>
    );
};

export default PieChart;
