'use strict';
const { Model } = require('sequelize');

// Construction du modèle Answer
module.exports = (sequelize, DataTypes) => {
  var Answer = sequelize.define('Answer', {
    content: DataTypes.TEXT,
    messageId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  });

  Answer.associate = function (models) {
    // Association de la table Message et User avec Answer
    Answer.belongsTo(models.User, {
      // Association avec la table User
      foreignKey: 'userId',
    });
    Answer.belongsTo(models.Message, {
      //Association avec la table Message
      foreignKey: 'messageId',
      onDelete: 'CASCADE', // Si on supprime un message, on supprime ses réponses
    });
  };
  return Answer;
};
