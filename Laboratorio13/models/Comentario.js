const comentarios = [];

module.exports = class Comentario {
  constructor(nombre, texto) {
    this.nombre = nombre;
    this.comentario = texto;
  }

  save() {
    comentarios.push(this);
  }

  static fetchAll() {
    return comentarios;
  }
}
