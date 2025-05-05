function tablaCuadradosCubos(n) {
    let tabla = "<h2>Tabla de cuadrados y cubos</h2>";
    tabla += "<table border='1'><tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>";
    for (let i = 1; i <= n; i++) {
      tabla += `<tr><td>${i}</td><td>${i ** 2}</td><td>${i ** 3}</td></tr>`;
    }
    tabla += "</table>";
    return tabla;
  }

  
  function sumaConTiempo() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const inicio = Date.now();
    const respuesta = parseInt(prompt(`Cuánto es ${a} + ${b}?`));
    const fin = Date.now();
    const tiempo = ((fin - inicio) / 1000).toFixed(2);
    const mensaje = respuesta === a + b
      ? `Correcto! Tiempo: ${tiempo} segundos`
      : `Incorrecto. Era ${a + b}. Tiempo: ${tiempo} segundos`;
    return mensaje;
  }
  

  function contador(arr) {
    let negativos = 0, ceros = 0, positivos = 0;
    arr.forEach(n => {
      if (n < 0) negativos++;
      else if (n === 0) ceros++;
      else positivos++;
    });
    return [negativos, ceros, positivos];
  }

  function promedios(matriz) {
    return matriz.map(fila => {
      const suma = fila.reduce((acc, val) => acc + val, 0);
      return suma / fila.length;
    });
  }

  function inverso(num) {
    return parseInt(num.toString().split('').reverse().join(''));
  }
  
  class JugadorBasket {
    constructor(nombre, puntosPorPartido) {
      this.nombre = nombre;
      this.puntosPorPartido = puntosPorPartido;
    }
  
    mostrarDatos() {
      return `${this.nombre} promedia ${this.puntosPorPartido} puntos por partido.`;
    }
  
    esEstrella() {
      return this.puntosPorPartido >= 20
        ? "Es una estrella del equipo."
        : "No es estrella del equipo.";
    }
  }
  
  function crearJugador() {
    const nombre = document.getElementById("nombreJugador").value.trim();
    const puntos = parseFloat(document.getElementById("puntosJugador").value);
    if (!nombre || isNaN(puntos)) {
      document.getElementById("resultadoJugador").innerHTML = `<p style="color:red;">Completa todos los campos correctamente.</p>`;
      return;
    }
    const jugador = new JugadorBasket(nombre, puntos);
    document.getElementById("resultadoJugador").innerHTML = `
      <p>${jugador.mostrarDatos()}</p>
      <p>${jugador.esEstrella()}</p>
    `;
  }
