// backend/src/app.js
const express = require('express');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rota base de teste
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

module.exports = app;
