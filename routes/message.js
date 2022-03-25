const express = require('express');
const router = express.Router();

const messageControl = require('../controllers/message');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); //

// Rajout du middleware auth sur les routes à protéger
router.post('/new', auth, multer, messageControl.createMessage);
router.delete('/:id', auth, messageControl.deleteMessage);
router.get('/:id', auth, messageControl.getOneMessage);
router.put('/:id', auth, messageControl.ModifyMessage);
router.get('/', auth, messageControl.getAllMessages);

module.exports = router;
