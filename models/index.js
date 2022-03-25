'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize; // Initialise sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Recherche dans le répertoire
fs.readdirSync(__dirname)
  .filter((file) => {
    // Filtrer les fichiers qui sont dans le répertoire models, recherche les fichiers .js
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    // Pour les fichiers récupérés
    const model = require(path.join(__dirname, file))(
      // Require les fichiers .js
      sequelize, // Appeler le modèle
      Sequelize.DataTypes
    );
    db[model.name] = model; // Les sauvegarder dans la variable model
  }); // Dans cette variable tout les models

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
