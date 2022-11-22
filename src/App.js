import React from 'react';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PlanetsTable from './components/PlanetsTable';

function App() {
  return (
    <AuthProvider>
      <span>Hello, App!</span>
      <PlanetsTable />
    </AuthProvider>
  );
}

export default App;
