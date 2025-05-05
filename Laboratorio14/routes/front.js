const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/', (req, res) => {
  res.render('index');
});

router.get('/set-cookie', (req, res) => {
  res.setHeader('Set-Cookie', 'usuario=Alex; Max-Age=3600; HttpOnly');
  res.send('<h2>Cookie "usuario" creada. <a href="/leer-cookie">Ver cookie</a></h2>');
});

router.get('/leer-cookie', (req, res) => {
  const usuario = req.cookies.usuario;
  res.send(`<h2>Cookie recibida: usuario = ${usuario}</h2>`);
});

router.get('/login', (req, res) => {
    req.session.usuario = 'Alex';
    res.send('<h2>Sesión iniciada como "Alex". <a href="/perfil">Ir a perfil</a></h2>');
  });

  router.get('/perfil', (req, res) => {
    if (req.session.usuario) {
      res.send(`<h2>Bienvenido, ${req.session.usuario}. <a href="/logout">Cerrar sesión</a></h2>`);
    } else {
      res.send('<h2>No has iniciado sesión. <a href="/login">Iniciar</a></h2>');
    }
  });
  
  router.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.send('<h2>Sesión cerrada. <a href="/login">Iniciar de nuevo</a></h2>');
    });
  });

module.exports = router;
