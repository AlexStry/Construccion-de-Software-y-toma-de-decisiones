const jugadores = [];

module.exports = class Jugador {
  constructor(nombre, puntosPorPartido) {
    this.nombre = nombre;
    this.puntos = parseFloat(puntosPorPartido);
    this.esEstrella = this.puntos > 20;
  }

  save() {
    jugadores.push(this);
  }

  static fetchAll() {
    return jugadores;
  }
};
