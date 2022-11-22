import React from 'react';
import './App.css';
import AuthContext from './context/AuthContext';

function App() {
  return (
    <AuthContext.Provider value={ {} }>
      <span>Hello, App!</span>
    </AuthContext.Provider>
  );
}

export default App;
