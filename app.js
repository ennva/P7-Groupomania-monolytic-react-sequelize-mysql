const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

// Require routeurs
const userRoutes = require('./routes/user'); // user
const messageRoutes = require('./routes/message'); // message
const answerRoutes = require('./routes/answer'); // answer

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE, OPTIONS',
  preflightContinue: false,
};
app.use(cors());

app.use(bodyParser.json()); // Utilisation de BodyParser
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images'))); // Pour les requêtes envoyées à /images, on renvois dans ce dossier images

// Routeurs
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/answers', answerRoutes);

module.exports = app;
