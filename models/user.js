'use strict';
const { Model } = require('sequelize');

// Construction du modèle User
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    jobtitle: DataTypes.STRING,
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  User.associate = function (models) {
    // Association de la table User et Message
    User.hasMany(models.Message, {
      foreignKey: 'userId',
      as: 'messages', // Association de un à plusieurs
      // Un utilisateur peut envoyer plusieurs messages
    });
  };

  return User;
};
