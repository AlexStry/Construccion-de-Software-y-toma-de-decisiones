const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


const rutasFront = require('./routes/front');
const rutasForm = require('./routes/form');
const rutasJugador = require('./routes/jugador');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'Sitio')));
app.use('/', rutasFront);
app.use('/form', rutasForm);
app.use('/jugador', rutasJugador);

app.use((req, res) => {
  res.status(404).render('404', { titulo: 'Página no encontrada' }); 
});

app.listen(3000, () => {
  console.log('Servidor iniciado en http://localhost:3000');
});
