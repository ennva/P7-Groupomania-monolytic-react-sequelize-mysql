const bcrypt = require('bcrypt'); // Pour crypter les mots de pass avec hash
const jwt = require('jsonwebtoken'); // Connection sécurisé grâce aux tokens

const { User } = require('../models/index');

// RegEx
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/;
const regexPassword =
  /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

// Créer un nouvel utilisateur
exports.signup = (req, res, next) => {
  console.log(req.body);
  if (
    req.body.email == null ||
    req.body.password == null ||
    req.body.lastname == null ||
    req.body.firstname == null
  ) {
    return res.status(400).json({ error: 'Error' });
  }
  if (!regexEmail.test(req.body.email)) {
    return res.status(400).json({ error: 'Email invalide' });
  }
  if (!regexPassword.test(req.body.password)) {
    return res.status(400).json({ error: 'Mot de passe invalide' });
  } // Vérifier si l'email n'existe pas déja dans la Base de données
  User.findOne({
    attributes: ['email'],
    where: { email: req.body.email },
  }) // Créer l'utilisateur
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            console.log(hash);
            const signUser = User.create({
              email: req.body.email,
              password: hash,
              lastname: req.body.lastname,
              firstname: req.body.firstname,
              jobtitle: req.body.jobtitle,
              isAdmin: req.body.isAdmin,
            }).then((user) => {
              console.log(user);
              res.status(201).json({ message: 'Utilisateur créé' });
            });
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })

    .catch((error) =>
      res.status(500).json({ error: 'Cette utilisateur à déjà un compte' })
    );
};

// Connexion
exports.login = (req, res, next) => {
  console.log(req.body);
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non reconnu' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
          }
          res.status(200).json({
            // Si la comparaison est bonne, renvoit un objet JSON contenant l'userId + un token signé de JWT
            userId: user.id,
            token: jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h',
            }),
            isAdmin: user.isAdmin, // Indiquer si l'utilisateur est un admin
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })

    .catch((error) => res.status(500).json({ error }));
};

// Récupérer un compte
exports.getOneAccount = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

// Récupérer tout les comptes
exports.getAllAccounts = (req, res, next) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};

// Modifier un compte
exports.modifyAccount = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      lastname = req.body.lastname;
      firstname = req.body.firstname;
      jobtitle = req.body.jobtitle;
      User.update()
        .then(() => res.status(201).json({ message: 'Compte modifié' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Supprimer un compte
exports.deleteAccount = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      User.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Compte supprimé' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
