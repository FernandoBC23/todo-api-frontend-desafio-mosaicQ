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

  // Estados do formulário
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('pendente');

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

      const novaTarefa = await response.json();
      setTarefas([...tarefas, novaTarefa]);
      setTitulo('');
      setDescricao('');
      setStatus('pendente');
    } catch (err: any) {
      setErro(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '30px auto' }}>
      <h2>📋 Lista de Tarefas</h2>

      {/* Formulário de nova tarefa */}
      <form onSubmit={handleCriarTarefa} style={{ marginBottom: 30 }}>
        <h3>➕ Criar nova tarefa</h3>
        <div>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pendente">Pendente</option>
            <option value="em progresso">Em progresso</option>
            <option value="concluída">Concluída</option>
          </select>
        </div>
        <button type="submit">Criar</button>
      </form>

      {/* Exibição de tarefas */}
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {tarefas.length === 0 ? (
        <p>Nenhuma tarefa encontrada.</p>
      ) : (
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>
                <strong>{tarefa.titulo}</strong> - {tarefa.status}
                <br />
                {tarefa.descricao && <p>{tarefa.descricao}</p>}
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
