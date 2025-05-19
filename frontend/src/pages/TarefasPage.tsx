// frontend/src/pages/TarefasPage.tsx

import { useEffect, useState } from 'react';
import NovaTarefaForm from '../components/NovaTarefaForm';

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
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [tarefaEditando, setTarefaEditando] = useState<Tarefa | null>(null);
  const token = localStorage.getItem('token');

  const carregarTarefas = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTarefas(data);
    } catch (err: any) {
      setErro(err.message);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  const atualizarCampo = (campo: keyof Tarefa, valor: string) => {
    if (tarefaEditando) {
      setTarefaEditando({ ...tarefaEditando, [campo]: valor });
    }
  };

  const salvarEdicao = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tarefaEditando) return;

    try {
      const response = await fetch(`http://localhost:3000/tasks/${tarefaEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tarefaEditando),
      });
      const atualizada = await response.json();
      setTarefas(tarefas.map((t) => (t.id === atualizada.id ? atualizada : t)));
      setTarefaEditando(null);
    } catch (err: any) {
      setErro(err.message);
    }
  };

  const excluirTarefa = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTarefas(tarefas.filter((t) => t.id !== id));
    } catch (err: any) {
      setErro(err.message);
    }
  };

return (
  <div className="container">
    {/* Botão de Logout */}
    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
      <button
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
        style={{ backgroundColor: '#dc3545' }}
      >
        Logout
      </button>
    </div>

    <h2>Lista Tarefas</h2>

    {/* Aqui vem a mensagem de erro */}
    {erro && <p style={{ color: 'red', marginBottom: 10 }}>{erro}</p>}

    <button onClick={() => setMostrarFormulario(!mostrarFormulario)}>
      {mostrarFormulario ? 'Cancelar' : 'Nova Tarefa'}
    </button>

    {mostrarFormulario && (
      <NovaTarefaForm
        onTarefaCriada={() => {
          carregarTarefas();
          setMostrarFormulario(false);
        }}
      />
    )}

    {tarefas.length === 0 ? (
      <p>Nenhuma tarefa encontrada.</p>
    ) : (
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            {tarefaEditando?.id === tarefa.id ? (
              <form onSubmit={salvarEdicao}>
                <input
                  type="text"
                  value={tarefaEditando.titulo}
                  onChange={(e) => atualizarCampo('titulo', e.target.value)}
                  placeholder="Título"
                />
                <input
                  type="text"
                  value={tarefaEditando.descricao}
                  onChange={(e) => atualizarCampo('descricao', e.target.value)}
                  placeholder="Descrição"
                />
                <select
                  value={tarefaEditando.status}
                  onChange={(e) => atualizarCampo('status', e.target.value)}
                >
                  <option value="pendente">Pendente</option>
                  <option value="em progresso">Em Progresso</option>
                  <option value="concluída">Concluída</option>
                </select>
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setTarefaEditando(null)}>
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                <strong>{tarefa.titulo}</strong> — {tarefa.status}
                <br />
                <small>{tarefa.descricao}</small>
                <br />
                <button onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
                <button onClick={() => setTarefaEditando(tarefa)}>Editar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default TarefasPage;
