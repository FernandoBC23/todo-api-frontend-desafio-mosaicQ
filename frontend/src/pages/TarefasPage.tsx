import { useEffect, useState } from 'react';

interface Tarefa {
  id: number;
  titulo: string;
  descricao?: string;
  status: string;
  data_criacao: string;
}

function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Erro ao buscar tarefas');
        }
        return res.json();
      })
      .then((data) => setTarefas(data))
      .catch((err) => setErro(err.message));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '30px auto' }}>
      <h2>📋 Lista de Tarefas</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
              <strong>{tarefa.titulo}</strong> - {tarefa.status}
              <br />
              <small>Criada em: {new Date(tarefa.data_criacao).toLocaleDateString()}</small>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TarefasPage;
