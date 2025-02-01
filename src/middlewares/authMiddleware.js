// Exemplo de um middleware simples que verifica se há um token no cabeçalho
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Valide o token, decodifique etc.
    next();
  }
  
  module.exports = authMiddleware;
  