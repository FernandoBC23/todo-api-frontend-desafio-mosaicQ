
# 🧠 Backend - Todo API

API desenvolvida em Node.js com Express e PostgreSQL para gerenciamento de tarefas.

---

## 🔧 Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- JWT (autenticação)
- pg (driver PostgreSQL)
- dotenv (variáveis de ambiente)

---

## 🚀 Como rodar o backend localmente

### 1. Instale as dependências

Acesse a pasta `backend/` e rode:

```bash
npm install
```

---

### 2. Configure o banco de dados

- Crie um banco PostgreSQL com o nome definido no `.env` (ex: `desafio_mosaicQ`)
- Execute o script abaixo para criar a tabela `tasks`:

```bash
psql -U seu_usuario -d desafio_mosaicQ -f database/init.sql
```

> Substitua `seu_usuario` pelo seu usuário do PostgreSQL.

---

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` com base no `.env.example`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=desafio_mosaicQ

JWT_SECRET=sua_chave_secreta
JWT_EXPIRES_IN=1h
```

---

### 4. Inicie o servidor

```bash
npm start
```

A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

