const express = require('express');
const router = express.Router();

const userControl = require('../controllers/user');
const auth = require('../middleware/auth');

// Routes d'authentification
// Rajout du middleware auth sur les routes à protéger
router.post('/signup', userControl.signup);
router.post('/login', userControl.login);

router.get('/accounts', userControl.getAllAccounts);
router.delete('/accounts/:id', auth, userControl.deleteAccount);
router.get('/accounts/:id', auth, userControl.getOneAccount);
router.put('/accounts/:id', auth, userControl.modifyAccount);

module.exports = router;
