import React, { useState, useEffect, ChangeEvent } from 'react';
import api from '../services/api.tsx';
import '../App.css';  // Substitua 'nome-do-seu-arquivo-css' pelo nome real do seu arquivo CSS

interface Cliente {
  id: string;
  nome: string;
  email: string;
}

const ListaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [newCliente, setNewCliente] = useState<{ nome: string; email: string }>({ nome: '', email: '' });

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await api.get('/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao obter clientes da API:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleAddCliente = async () => {
    try {
      const response = await api.post('/clientes', newCliente);
      setClientes([...clientes, response.data]);
      setNewCliente({ nome: '', email: '' });
    } catch (error) {
      console.error('Erro ao adicionar cliente à API:', error);
    }
  };

  return (
    <div className="lista-clientes">
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map(cliente => (
          <li key={cliente.id}>{cliente.nome} - {cliente.email}</li>
        ))}
      </ul>
      <div>
        <label>
          Nome:
          <input type="text" value={newCliente.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCliente({ ...newCliente, nome: e.target.value })} />
        </label>
        <label>
          Email:
          <input type="text" value={newCliente.email} onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCliente({ ...newCliente, email: e.target.value })} />
        </label>
        <button onClick={handleAddCliente}>Adicionar Cliente</button>
      </div>
    </div>
  );
};

export default ListaClientes;
