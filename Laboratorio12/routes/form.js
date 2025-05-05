const express = require('express');
const router = express.Router();
const comentarios = [];

router.post('/enviar', (req, res) => {
  const nombre = req.body.nombre;
  const comentario = req.body.comentario;
  comentarios.push({ nombre, comentario });
  res.redirect('/form/comentarios');
});

router.get('/comentarios', (req, res) => {
  res.render('comentarios', { comentarios });
});

module.exports = router;
