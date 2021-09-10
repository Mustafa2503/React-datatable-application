import React from "react";
import { useTable, useSortBy } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy
    )

    return (
        <div>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                // Add the sorting props to control sorting
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <br />
            <div>Showing the first 10 results of {rows.length} rows</div>
        </div >
    )
}

function SortingTableComponent() {
    const columns = React.useMemo(
        () => [
            {
                Header: 'Name',
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age',
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits',
                    },
                    {
                        Header: 'Status',
                        accessor: 'status',
                    },
                    {
                        Header: 'Last Activity',
                        accessor: 'activity',
                    },
                ],
            },
        ],
        []
    )

    const data = [
        {
            "firstName": "Ahmad",
            "lastName": "Hasan",
            "age": 21,
            "visits": 200,
            "activity": "frequent",
            "status": "Premium"
        },
        {
            "firstName": "Shaheer",
            "lastName": "Kazmi",
            "age": 36,
            "visits": 1000,
            "activity": "frequent",
            "status": "Standard"
        },
        {
            "firstName": "Abdullah",
            "lastName": "Soomro",
            "age": 36,
            "visits": 12,
            "activity": "InActive",
            "status": "Standard"
        },
        {
            "firstName": "Mustafa",
            "lastName": "Ispahani",
            "age": 22,
            "visits": 500,
            "activity": "frequent",
            "status": "Premium"
        },
        {
            "firstName": "Donald",
            "lastName": "Trump",
            "age": 68,
            "visits": 5000,
            "activity": "frequent",
            "status": "Premium"
        },
        {
            "firstName": "Al Thani",
            "lastName": "Sheikh",
            "age": 22,
            "visits": 5,
            "activity": "InActive",
            "status": "Premium"
        },
        {
            "firstName": "Marieflor",
            "lastName": "Maligaya",
            "age": 21,
            "visits": 500,
            "activity": "frequent",
            "status": "Premium"
        },
        {
            "firstName": "Faraz",
            "lastName": "Waqar",
            "age": 37,
            "visits": 200,
            "activity": "frequent",
            "status": "Premium"
        },
        {
            "firstName": "John",
            "lastName": "Mearsheimer",
            "age": 82,
            "visits": 2,
            "activity": "InActive",
            "status": "Dormant"
        },
        {
            "firstName": "Bubba",
            "lastName": "Wallace",
            "age": 42,
            "visits": 80,
            "activity": "frequent",
            "status": "Premium"
        }
    ]

    console.log(JSON.stringify(data));


    return (
        <Table columns={columns} data={data} />
    )
}

export default SortingTableComponent;