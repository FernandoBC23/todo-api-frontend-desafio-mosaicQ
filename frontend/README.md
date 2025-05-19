# 🖥️ Frontend - Todo App

Interface web desenvolvida em **React + TypeScript + Vite** para gerenciar tarefas conectando-se à API do backend.

---

## ⚙️ Tecnologias Utilizadas

- React
- TypeScript
- Vite
- HTML e CSS
- Fetch API
- Responsividade com CSS puro

---

## 🔐 Autenticação

O usuário deve realizar login com e-mail e senha válidos para obter um **token JWT**, que será salvo no `localStorage`.

O token é usado para acessar as rotas protegidas da API.

---

## 🚀 Como rodar o frontend localmente

### 1. Instale as dependências

```bash
cd frontend
npm install
```

### 2. Inicie o projeto

```bash
npm run dev
```

A aplicação será aberta em: [http://localhost:5173](http://localhost:5173)

---

## 💡 Funcionalidades

- Login com autenticação JWT
- Visualização de tarefas
- Criação de nova tarefa
- Edição e exclusão de tarefas
- Validação e exibição de mensagens de erro
- Interface responsiva e moderna
- Logout

---

## 📁 Estrutura de Pastas

```
src/
├── components/
│   └── PrivateRoute.tsx
│   └── NovaTarefaForm.tsx
├── pages/
│   └── LoginPage.tsx
│   └── TarefasPage.tsx
├── styles.css
```

---

## 🧩 Backend

O frontend consome os dados da API implementada em Node.js, disponível na pasta `backend`.

---

## ✅ Requisitos Atendidos

- [x] Utiliza React com TypeScript
- [x] Conecta-se com a API desenvolvida
- [x] Permite criar, visualizar, editar e excluir tarefas
- [x] Apresenta uma interface responsiva e amigável

---

> Desenvolvido como parte do desafio técnico proposto.