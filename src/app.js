const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const modulesRouter = require('./modules');
const authMiddleware = require('./middlewares/authMiddleware');
const logger = require('./utils/logger');

const app = express();

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(express.json());

// Exemplo: se quiser autenticar todas as rotas, descomente
// app.use(authMiddleware);

// Rotas principais (agrupa todas as rotas do /src/modules)
app.use('/api', modulesRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my real-time chat API!');
});

// Exemplo de middleware de erro
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

module.exports = app;
