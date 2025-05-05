const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

router.get('/comentarios', formController.getComentarios);
router.post('/enviar', formController.postComentario);

module.exports = router;
