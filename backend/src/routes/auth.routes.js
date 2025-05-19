const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();

// Usuário simulado
const fakeUser = {
  id: 1,
  email: 'admin@email.com',
  password: '$2b$10$ttMuSD2m55G8hZSBP/7yOOJZBqQ7OOLI9u7iwGgK56qj75pJJXMD.' // senha: 123456
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Token JWT gerado
 *       401:
 *         description: Credenciais inválidas
 */


router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
  }

  if (email !== fakeUser.email) {
    return res.status(401).json({ error: 'Usuário não encontrado' });
  }

  const senhaValida = await bcrypt.compare(senha, fakeUser.password);

  if (!senhaValida) {
    return res.status(401).json({ error: 'Senha inválida' });
  }

  const token = jwt.sign(
    { id: fakeUser.id, email: fakeUser.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return res.status(200).json({ token });
});

module.exports = router;
