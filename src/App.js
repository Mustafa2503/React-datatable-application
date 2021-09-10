import React from 'react';
import './App.css';
import BasicTableComponent from './components/basic.table';
import FilterTableComponent from './components/filter.table';
import PaginationTableComponent from './components/pagination.table';
import SortingTableComponent from './components/sorting.table';

function App() {

  return (
    <div className="App">

      <h3>Profile Statistics Table </h3>

      <BasicTableComponent />

      <h3>Filter Table using <code>Profile Statistics Table</code></h3>

      <FilterTableComponent />

      <h3>Table with Pagination using <code>Profile Statistics Table</code></h3>

      <PaginationTableComponent />

      <h3>Sorted data from <code>Profile Statistics Table</code></h3>

      <SortingTableComponent />

    </div>
  );
}

export default App;