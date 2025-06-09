const express = require('express');
const cors = require('cors');
const app = express();
const gameRoutes = require('./routes/gameRoutes');

app.use(cors());
app.use(express.json());
app.use('/game', gameRoutes);
app.get('/', (req, res) => {
  res.send('API Batalla Naval lista. Usa /game/create para empezar.');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
