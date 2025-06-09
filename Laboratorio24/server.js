const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// POST AJAX
app.post('/form_method', (req, res) => {
  const indice = Number(req.body.indice);
  const imprimir = req.body.imprimir;
  for (let i = 0; i < indice; i++) {
    console.log(imprimir);
  }
  const linea = `Indice: ${indice}, Valor: ${imprimir}\n`;
  fs.appendFile("datos_formulario.txt", linea, err => {
    if (err) {
      console.error("Error al guardar:", err);
      return res.status(500).json({ msg: "Error al guardar los datos." });
    }
    console.log("Datos guardados!");
    return res.status(200).json({ msg: `Se recibió correctamente: "${imprimir}" ${indice} veces.` });
  });
});

// Ruta unicornio
app.get('/unicorn', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send("Los unicornios son reales!");
});

// Ruta 404
app.use((req, res) => {
  res.status(404).send("404 - Página no encontrada");
});

// Escuchar
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
