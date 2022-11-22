import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsContext';
import PlanetsTable from './components/PlanetsTable';
import Filters from './components/Filters';
import FiltersProvider from './context/FiltersContext';

function App() {
  return (
    <PlanetsProvider>
      <FiltersProvider>
        <Filters />
        <PlanetsTable />
      </FiltersProvider>
    </PlanetsProvider>
  );
}

export default App;
