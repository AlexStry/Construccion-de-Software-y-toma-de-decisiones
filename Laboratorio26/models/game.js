const ESTADO = {
    SETEANDO: 'SETEANDO',
    JUGANDO: 'JUGANDO',
    FINALIZADO: 'FINALIZADO'
  };
  
  const game = {
    estado: ESTADO.SETEANDO,
    turno: null,
    jugadores: {
      1: {
        barcos: [],
        ataques: [],
        hundidos: 0
      },
      2: {
        barcos: [],
        ataques: [],
        hundidos: 0
      }
    },
  
    reset() {
      this.estado = ESTADO.SETEANDO;
      this.turno = null;
      this.jugadores[1] = { barcos: [], ataques: [], hundidos: 0 };
      this.jugadores[2] = { barcos: [], ataques: [], hundidos: 0 };
    },
  
    status() {
      return {
        estado: this.estado,
        turno: this.turno,
        barcosJ1: this.jugadores[1].barcos.length,
        barcosJ2: this.jugadores[2].barcos.length
      };
    },
  
    setTurnRandom() {
      if (this.estado !== ESTADO.SETEANDO) return null;
      this.turno = Math.random() < 0.5 ? 1 : 2;
      return this.turno;
    },
  
    setShips(jugador, barcos) {
      if (this.estado !== ESTADO.SETEANDO) {
        return { ok: false, msg: 'No puedes colocar barcos en esta fase(duh)' };
      }
      if (!this.jugadores[jugador]) {
        return { ok: false, msg: 'Jugador inválido!' };
      } 
      if (this.jugadores[jugador].barcos.length > 0) {
        return { ok: false, msg: 'Ya colocaste tus barcos...' };
      }
      if (!Array.isArray(barcos) || barcos.length !== 10) {
        return { ok: false, msg: 'Debes colocar exactamente 10 barcos...(This is embarrasing...)' };
      }
      for (let barco of barcos) {
        if (!Array.isArray(barco.positions) || barco.positions.length === 0) {
          return { ok: false, msg: 'Faltan posiciones en un barco!' };
        }  
        for (let [x, y] of barco.positions) {
          if (x < 0 || x > 9 || y < 0 || y > 9) {
            return { ok: false, msg: 'Posiciones fuera del tablero.' };
          }
        }
      }
  
      this.jugadores[jugador].barcos = barcos;
      const ambosListos =
        this.jugadores[1].barcos.length === 10 &&
        this.jugadores[2].barcos.length === 10;
      if (ambosListos) {
        this.estado = ESTADO.JUGANDO;
      }
  
      return { ok: true };
    },
  
    attack(jugador, x, y) {
      if (this.estado !== ESTADO.JUGANDO) {
        return { ok: false, msg: 'No puedes atacar en esta fase :(' };
      }
      if (jugador !== this.turno) {
        return { ok: false, msg: 'No es tu turno-_-' };
      }
  
      const oponente = jugador === 1 ? 2 : 1;
      const yaDisparo = this.jugadores[jugador].ataques.find(
        (a) => a.x === x && a.y === y
      );

      if (yaDisparo) {
        return { ok: false, msg: 'Ya atacaste esa coordenada...' };
      }
  
      const golpe = this._registrarGolpe(jugador, oponente, x, y);
      const mensaje = golpe ? 'GOLPE' : 'FALLO';
      const ganador = this._revisarFin(oponente);
  
      if (ganador) {
        this.estado = ESTADO.FINALIZADO;
        return {
          ok: true,
          resultado: mensaje,
          fin: true,
          ganador: jugador
        };
      }
      if (!golpe) {
        this.turno = oponente;
      }
  
      return {
        ok: true,
        resultado: mensaje,
        siguienteTurno: this.turno
      };
    },
  
    info(jugador) {
      return {
        ataquesRealizados: this.jugadores[jugador].ataques.length,
        barcosRestantes: 10 - this.jugadores[jugador].hundidos,
        estado: this.estado
      };
    },
  
    _registrarGolpe(jugador, oponente, x, y) {
      const enemigo = this.jugadores[oponente];
      const atacante = this.jugadores[jugador];
      atacante.ataques.push({ x, y });
  
      for (let barco of enemigo.barcos) {
        for (let i = 0; i < barco.positions.length; i++) {
          const [bx, by] = barco.positions[i];
          if (bx === x && by === y) {
            barco.positions.splice(i, 1);
            if (barco.positions.length === 0) {
              this.jugadores[oponente].hundidos++;
            }
            return true;
          }
        }
      }
  
      return false;
    },
  
    _revisarFin(oponente) {
      return this.jugadores[oponente].hundidos === 10;
    }
  };
  
  module.exports = game;
  
