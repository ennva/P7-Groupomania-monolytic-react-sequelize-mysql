const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images'); // Nom du dossier 'images'
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // Éliminer les espaces
    const extension = MIME_TYPES[file.mimetype]; // Extension du fichier
    callback(null, name + Date.now() + '.' + extension); // Construction (nom, date, '.' , extension)
  },
});

module.exports = multer({ storage }).single('image');
