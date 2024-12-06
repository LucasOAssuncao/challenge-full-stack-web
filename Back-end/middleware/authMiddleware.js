const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token não fornecido ou malformado' });
    }

    const token = authHeader.split(' ')[1];
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    return res.status(500).json({ message: 'Erro ao validar token' });
  }
};

module.exports = authMiddleware;
