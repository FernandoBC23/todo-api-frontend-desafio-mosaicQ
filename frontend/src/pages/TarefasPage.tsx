// frontend/src/pages/TarefasPage.tsx

import { useEffect, useState } from 'react';
import NovaTarefaForm from '../components/NovaTarefaForm';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { FaClipboardList } from 'react-icons/fa';


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
    <div className="logout-wrapper">
      <button
        className="logout"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/';
        }}
      >
        Logout
      </button>
    </div>


    <h2><FaClipboardList style={{ marginRight: '10px' }} /> Lista de Tarefas</h2>
    <p className="subtitulo">Organize seu dia com praticidade</p>


    {erro && <p style={{ color: 'red', marginBottom: 10 }}>{erro}</p>}

    <button className="nova-tarefa" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
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
      <div className="quadro-tarefas">
        {['pendente', 'em progresso', 'concluída'].map((status) => (
          <div className="coluna-tarefas" key={status}>
            <h3>
              {status === 'pendente'
                ? 'Pendentes'
                : status === 'em progresso'
                ? 'Em Progresso'
                : 'Concluídas'}
            </h3>
            <ul>
              {tarefas
                .filter((t) => t.status === status)
                .map((tarefa) => (
                  <li key={tarefa.id} className={tarefa.status.replace(' ', '-')}>
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
                        <strong>{tarefa.titulo}</strong>                        
                        <small>{tarefa.descricao}</small>
                        <br />
                        <div className="botoes-acoes">
                          <button className="excluir" onClick={() => excluirTarefa(tarefa.id)}>
                            <FaTrash style={{ marginRight: '6px' }} />
                            Excluir
                          </button>

                          <button className="editar" onClick={() => setTarefaEditando(tarefa)}>
                            <FaEdit style={{ marginRight: '6px' }} />
                            Editar
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default TarefasPage;
