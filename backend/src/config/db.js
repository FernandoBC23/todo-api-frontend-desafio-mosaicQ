const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool.connect()
  .then(() => {
    console.log('📡 Conectado ao banco de dados PostgreSQL!');
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
  });

module.exports = pool;
