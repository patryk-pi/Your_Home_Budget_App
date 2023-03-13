import React, {useContext} from 'react';
import {Pie} from 'react-chartjs-2';
import {AppContext} from '../../context/AppProvider';

import {Chart, ArcElement} from 'chart.js'

Chart.register(ArcElement)

const PieChart = () => {
    const {operations, filterOperationsByMonth} = useContext(AppContext);

    console.log([...new Set(operations
        .map(({category}) => category))
    ],)



    // Format data for Pie chart
    const data = {
        labels: [...new Set(operations
            .map(({category}) => category))
        ],
        datasets: [
            {
                label: 'Zł',
                data: operations
                    .filter((operation) => filterOperationsByMonth(operation))
                    .filter(({amount}) => amount < 0)
                    .map(({amount}) => amount),
            },
        ],
    };



    return <Pie data={data}/>;
};

export default PieChart;
