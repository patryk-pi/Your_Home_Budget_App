import React, { useContext, useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { AppContext } from '../../context/AppProvider';
import { Chart, ArcElement, Colors, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Colors, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ graphStyle, transaction }) => {
    const { operations, filterOperationsByMonth, operationMonth, prevMonth, nextMonth } = useContext(AppContext);

    // Filter transactions by income or expense
    const filteredOperations =
        transaction === 'income'
            ? operations.filter(({ amount }) => amount > 0)
            : operations.filter(({ amount }) => amount < 0)


    const [categories, setCategories] = useState([]);
    // Format data for Pie chart

    useEffect(() => {
        const categories = [...new Set(filteredOperations
            .filter((operation) => filterOperationsByMonth(operation))
            .map(({ category }) => category))];
        setCategories(categories);
    }, [filterOperationsByMonth]);


    const colors = ['#FF6384', '#36A2EB', '#ff922b', '#22b8cf', '#6495ED', '#FFD700', '#fa5252', '#69db7c', '#9400D3'];

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
                backgroundColor: colors.slice(0, categories.length),
                hoverBackgroundColor: colors.slice(0, categories.length),
            },
        ],
    };

    const tooltipLabelCallback = (tooltipItem) => {
        const label = tooltipItem.label;
        const value = tooltipItem.parsed;
        return `${label}: ${Math.abs(value)} PLN`;
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                fullWidth: true,
                maxWidth: 1000,
                fullSize: false,
                position: transaction === 'income' ? 'left' : 'right',
                labels: {
                    // Filter labels to only show those rendered in the chart
                    filter: (label, index) => data.datasets[0].data[index] !== 0,
                    color: 'white',
                    font: {
                        size: 12,
                        weight: 600,
                        family: 'Open Sans'
                    },

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
                },
                anchor: 'end',
                align: 'end',
                offset: -40,
            },
        },
    };

    if (data.datasets[0].data.every((sum) => sum === 0)) {
        return (
            <>
                <div style={{
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                <h1 style={{
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 600,
                }}>Brak danych dotyczących {transaction === 'income' ? 'wpływów' : 'wydatków'} </h1>
                </div>
            </>
        );
    }

    return (
        <>
            <Pie data={data} options={options} />
        </>
    );
};

export default PieChart;
