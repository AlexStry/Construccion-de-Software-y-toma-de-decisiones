const Comentario = require('../models/Comentario');

exports.getFormulario = (req, res) => {
  res.render('index');
};

exports.postComentario = (req, res) => {
  const nuevo = new Comentario(req.body.nombre, req.body.comentario);
  nuevo.save();
  res.redirect('/form/comentarios');
};

exports.getComentarios = (req, res) => {
  const lista = Comentario.fetchAll();
  res.render('comentarios', { comentarios: lista });
};
