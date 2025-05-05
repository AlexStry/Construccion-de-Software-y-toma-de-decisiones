const Jugador = require('../models/Jugador');


exports.getAgregarJugador = (req, res) => {
  res.render('agregar-jugador');
};

exports.postAgregarJugador = (req, res) => {
  const { nombre, puntos } = req.body;
  const nuevoJugador = new Jugador(nombre, puntos);
  nuevoJugador.save();
  res.redirect('/jugador');
};

exports.getJugadores = (req, res) => {
  const lista = Jugador.fetchAll();
  res.render('jugadores', { jugadores: lista });
};
