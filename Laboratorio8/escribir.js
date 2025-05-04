const fs = require('fs');

function guardarTexto(nombreArchivo, texto) {
  fs.writeFileSync(nombreArchivo, texto, 'utf8');
  console.log(`El texto se guardo en el archivo: ${nombreArchivo}`);
}

guardarTexto("salida.txt", "Archivo de node.js");
