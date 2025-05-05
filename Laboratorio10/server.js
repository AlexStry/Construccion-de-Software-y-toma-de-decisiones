const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("Autenticación!");
  next();
});

app.get('/', (req, res) => {
  res.setHeader('Content-type', 'text/plain');
  res.send("GET URL index /");
});

app.post('/', (req, res) => {
  res.setHeader('Content-type', 'text/plain');
  res.send("POST URL index /");
});


app.get('/unicorn', (req, res) => {
  res.setHeader('Content-type', 'text/plain');
  res.send("Los unicornios son reales");
});

app.get('/form_method', (req, res) => {
  res.setHeader('Content-type', 'text/html');
  const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), 'utf8');
  res.write(html);
  res.end();
});

app.post('/form_method', (req, res) => {
  const indice = Number(req.body.indice);
  const imprimir = req.body.imprimir;

  for (let i = 0; i < indice; i++) {
    console.log(imprimir);
  }
  const linea = `Índice: ${indice}, Valor: ${imprimir}\n`;
  fs.appendFile("datos_formulario.txt", linea, err => {
    if (err) {
      console.error("Error al guardar en archivo:", err);
    } else {
      console.log("Datos guardados correctamente.");
    }
  });

  res.setHeader('Content-type', 'application/json');
  res.statusCode = 200;
  res.write('{"code":200, "msg":"Ok POST"}');
  res.end();
});

app.use((req, res) => {
  res.status(404).send("404 - Página no encontrada");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000, http://localhost:3000/form_method, http://localhost:3000/unicorn");
});
