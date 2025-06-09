const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const multer = require('multer');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

// Filtro de archivos
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('archivo'));

// Para servir los archivos subidos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// POST AJAX
app.post('/form_method', (req, res) => {
  const indice = Number(req.body.indice);
  const imprimir = req.body.imprimir;
  const archivo = req.file; // contiene innfo del archivo subido
  for (let i = 0; i < indice; i++) {
    console.log(imprimir);
  }
  const linea = `Indice: ${indice}, Texto: ${imprimir}, Archivo: ${archivo ? archivo.filename : 'No se subió archivo'}\n`;
  fs.appendFile("datos_formulario.txt", linea, err => {
    if (err) {
      console.error("Error al guardar:", err);
    } else {
      console.log("Datos guardados.");
    }
  });

  res.send(`
    <p>Formulario recibido correctamente.</p>
    <p><a href="/">Volver</a></p>
    ${archivo ? `<p>Archivo subido: <a href="/uploads/${archivo.filename}" target="_blank">Ver imagen</a></p>` : '<p>No se subió archivo.</p>'}
  `);
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
