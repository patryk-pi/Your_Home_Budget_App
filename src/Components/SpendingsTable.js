import React from "react";
import dayjs from "dayjs";
import Table from "@mui/joy/Table";


const SpendingsTable = ({operations, filterOperations}) => {

    if (operations
        .filter((operation) => filterOperations(operation)).length === 0 ) {
        return (
            <h1>Brak danych</h1>
        )
    }

    return (

    <Table sx={{

    }}>
        <thead>
        <tr>
            <th>Kategoria</th>
            <th>Opis</th>
            <th>Kwota</th>
            <th>Data</th>

        </tr>
        </thead>
        <tbody>

        {operations
            .filter((operation) => filterOperations(operation))
            .map(({category, description, amount, date, id},) => (
                <tr key={id}>
                    <td>{category}</td>
                    <td>{description}</td>
                    <td>{amount}</td>
                    <td>{date}</td>
                </tr>
            ))}
        </tbody>
    </Table>
    )
}

export default SpendingsTable;