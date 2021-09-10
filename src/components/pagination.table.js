import React from "react";

import { useTable, usePagination } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css';

function Table({ columns, data }) {

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 2, pageSize: 2 },
        },
        usePagination
    )

    // Render the UI for table
    return (
        <div>
            <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre>
            <table className="table" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
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
            {/* 
         
        I am implementing a very basic UI
      */}
            <ul className="pagination">
                <li className="page-item" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <a className="page-link">First</a>
                </li>
                <li className="page-item" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <a className="page-link">{'<'}</a>
                </li>
                <li className="page-item" onClick={() => nextPage()} disabled={!canNextPage}>
                    <a className="page-link">{'>'}</a>
                </li>
                <li className="page-item" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <a className="page-link">Last</a>
                </li>
                <li>
                    <a className="page-link">
                        Page{' '}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{' '}
                    </a>
                </li>
                <li>
                    <a className="page-link">
                        <input
                            className="form-control"
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px', height: '20px' }}
                        />
                    </a>
                </li>{' '}
                <select
                    className="form-control"
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    style={{ width: '120px', height: '38px' }}
                >
                    {[2, 4, 6, 8, 10].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </ul>
        </div >
    )
}

function PaginationTableComponent() {
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

export default PaginationTableComponent;