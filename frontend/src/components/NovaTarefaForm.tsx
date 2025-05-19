// frontend/src/components/NovaTarefaForm.tsx

import { useState } from 'react';

interface Props {
  onTarefaCriada: () => void;
}

function NovaTarefaForm({ onTarefaCriada }: Props) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');
  const [erro, setErro] = useState('');

  const handleCriarTarefa = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ titulo, descricao, status }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao criar tarefa');
      }

      // Sucesso
      setTitulo('');
      setDescricao('');
      setStatus('pendente');
      onTarefaCriada();
    } catch (err: any) {
      setErro(err.message);
    }
  };

  return (
    <form onSubmit={handleCriarTarefa}>
      <h3>Criar Nova Tarefa</h3>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pendente">Pendente</option>
        <option value="em progresso">Em Progresso</option>
        <option value="concluída">Concluída</option>
      </select>

      <button type="submit">Adicionar</button>
    </form>
  );
}

export default NovaTarefaForm;
