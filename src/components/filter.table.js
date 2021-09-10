import React from "react";
import { useTable, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';


// Defining a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = React.useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
        setGlobalFilter(value || undefined)
    }, 200)

    return (
        <span>
            Search:{' '}
            <input
                className="form-control"
                value={value || ""}
                onChange={e => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`${count} records...`}
            />
        </span>
    )
}

function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length

    return (
        <input
            className="form-control"
            value={filterValue || ''}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            placeholder={`Search ${count} records...`}
        />
    )
}

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
            // Default Filter UI
            Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn
        },
        useFilters,
        useGlobalFilter
    )

    return (
        <div>
            <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <br />
            <div>Showing the first 10 results of {rows.length} rows</div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div>
        </div>
    )
}


function FilterTableComponent() {
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
                        accessor: 'lastName'
                    },
                ],
            },
            {
                Header: 'Info',
                columns: [
                    {
                        Header: 'Age',
                        accessor: 'age'
                    },
                    {
                        Header: 'Visits',
                        accessor: 'visits'
                    },
                    {
                        Header: 'Status',
                        accessor: 'status'
                    },
                    {
                        Header: 'Last Activity',
                        accessor: 'activity'
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

    return (
        <Table columns={columns} data={data} />
    )
}

export default FilterTableComponent;