const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1]; // Récupérer le token
    console.log(token);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Décoder le token la clé doit correspondre à celle de la fonction login
    console.log(decodedToken);
    const userId = decodedToken.userId; // Récupérer l'userId
    console.log(userId);
    req.decodedToken = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      // Si l'user ID est différent
      throw 'User ID non valide';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};
