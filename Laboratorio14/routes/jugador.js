const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugadorController');


router.get('/agregar', jugadorController.getAgregarJugador);
router.post('/agregar', jugadorController.postAgregarJugador);
router.get('/', jugadorController.getJugadores);

module.exports = router;
