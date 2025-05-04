const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Escribe el tiempo en segundos: ", (input) => {
  const segundos = parseInt(input);
  const horas = Math.floor(segundos / 3600);
  const residuo = segundos % 3600;
  const minutos = Math.floor(residuo / 60);
  const seg = residuo % 60;
  console.log("Horas:", horas);
  console.log("Minutos:", minutos);
  console.log("Segundos:", seg);
  rl.close();
});
