const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();


router.get('/comentarios', (req, res) => {
  res.send(`
    <h2>Deja tu comentario</h2>
    <form action="/form/enviar" method="POST">
      <input type="text" name="nombre" placeholder="Tu nombre" required>
      <br><br>
      <textarea name="comentario" placeholder="Tu comentario" required></textarea>
      <br><br>
      <button type="submit">Enviar</button>
    </form>
  `);
});

router.post('/enviar', (req, res) => {
  const { nombre, comentario } = req.body;
  const texto = `Nombre: ${nombre}\nComentario: ${comentario}\n----\n`;
  const rutaArchivo = path.join(__dirname, '../datos.txt');
  fs.appendFile(rutaArchivo, texto, (err) => {
    if (err) {
      console.error('Error al guardar comentario:', err);
      res.status(500).send('Error al guardar el comentario.');
    } else {
      res.send('<h3>Gracias por tu Comentario!</h3><a href="/">Volver al inicio</a>');
    }
  });
});

module.exports = router;
