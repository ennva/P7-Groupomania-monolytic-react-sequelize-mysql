'use strict';
const { Model } = require('sequelize');

// Construction du modèle Message
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
  });

  Message.associate = function (models) {
    //Association de la table User et Message
    Message.belongsTo(models.User, {
      // La table de message appartient à :
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE', // Si on supprime un user, on supprime ses messages
    });
    Message.hasMany(models.Answer, {
      foreignKey: 'messageId',
      as: 'answers', // Association de un à plusieurs
      // Un message peut avoir plusieurs réponses
    });
  };
  return Message;
};
