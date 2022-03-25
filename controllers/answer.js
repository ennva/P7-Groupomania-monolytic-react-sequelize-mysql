const { Answer } = require('../models/index');

// Créer une réponse
exports.createAnswer = (req, res, next) => {
  const answer = {
    userId: req.decodedToken.userId,
    messageId: req.body.messageId,
    content: req.body.content,
  };
  Answer.create(answer)
    .then(() => res.status(201).json({ message: 'Réponse envoyée' }))
    .catch((error) => res.status(400).json({ error }));
};

// Récupérer une réponse
exports.getOneAnswer = (req, res, next) => {
  Answer.findOne({ where: { id: req.params.id } })
    .then((answer) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};

// Récupérer toutes les réponses
exports.getAllAnswers = (req, res, next) => {
  Answer.findAll({
    where: { messageId: req.params.id },
  })
    .then((answers) => res.status(200).json(answers))
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer une réponse
exports.deleteAnswer = (req, res, next) => {
  Answer.findOne({ where: { id: req.params.id } }) // Recherche l'objet dans la base de données
    .then((answer) => {
      Answer.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Réponse supprimée' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
