const { Message } = require('../models/index');

// Créer un message
exports.createMessage = (req, res, next) => {
  const message = {
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
  };
  Message.create(message)
    .then(() => res.status(201).json({ message: 'Message envoyé' }))
    .catch((error) => res.status(400).json({ error }));
};

// Récupérer un message
exports.getOneMessage = (req, res, next) => {
  db.Messages.findByPk(req.params.id, {
    include: [
      {
        model: db.Users,
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.Answers,
        attributes: ['content'],
        include: { model: db.Users, attributes: ['firstname', 'lastname'] },
      },
    ],
  })
    .then((message) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};

// Récupérer tout les messages
exports.getAllMessages = (req, res, next) => {
  Message.findAll({
    include: ['user', 'answers'],
  })
    .then((messages) => res.status(200).json(messages))
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer un message
exports.deleteMessage = (req, res, next) => {
  Message.findOne({ where: { id: req.params.id } }) // Recherche l'objet dans la base de données
    .then((message) => {
      Message.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Message supprimé' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Modifier un message
exports.ModifyMessage = (req, res, next) => {
  db.Messages.findByPk(req.params.id, {
    include: [
      {
        model: db.Users,
        attributes: ['firstname', 'lastname'],
      },
      {
        model: db.Answers,
        attributes: ['content'],
        include: { model: db.Users, attributes: ['firstname', 'lastname'] },
      },
    ],
  })
    .then((message) => {
      console.log(message);
    })
    .catch((error) => res.status(404).json({ error }));
};
