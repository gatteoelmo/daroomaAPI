import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Recupera il token dall'header Authorization
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Accesso negato, token mancante' });
  }

  // Rimuovi il prefisso "Bearer " dal token
  const token = authHeader.replace('Bearer ', '');

  try {
    // Verifica il token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Salva i dati del token in req.user
    next(); // Passa al prossimo middleware o al controller
  } catch (error) {
    res.status(400).json({ message: 'Token non valido' });
  }
};

export default authMiddleware;
