require('dotenv').config(); // Carrega variáveis do .env

// Exemplo de leitura de variáveis, com defaults:
const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mysql://root:@localhost:3306/realtime_chat';
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  PORT,
  DATABASE_URL,
  NODE_ENV,
};
