// Exemplo usando console.log simples ou Winston/Pino
const logger = {
    info: (...params) => {
      console.log('[INFO]', ...params);
    },
    error: (...params) => {
      console.error('[ERROR]', ...params);
    },
  };
  
  module.exports = logger;
  