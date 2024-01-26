import React from 'react';
import ClientesList from './components/ListaClientes.tsx';
import './App.css';

const App: React.FC = () => {
  return (
    <div>
      <h1>Aplicação React com Json Server</h1>
      <ClientesList />
    </div>
  );
};

export default App;
