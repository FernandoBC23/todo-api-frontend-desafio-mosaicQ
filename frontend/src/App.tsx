import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TarefasPage from './pages/TarefasPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/tarefas" element={<TarefasPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
