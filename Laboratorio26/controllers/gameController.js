const game = require('../models/game');

exports.createGame = (req, res) => {
  game.reset();
  res.status(200).json({ mensaje: 'Juego reiniciado' });
};

exports.getStatus = (req, res) => {
  res.status(200).json(game.status());
};

exports.rollDice = (req, res) => {
  const result = game.setTurnRandom();
  res.status(200).json({ turno: result });
};

exports.setShips = (req, res) => {
  const player = parseInt(req.params.player);
  const result = game.setShips(player, req.body.ships);
  if (!result.ok) {
    return res.status(400).json({ error: result.msg });
  }
  res.status(200).json({ msg: 'Barcos colocados correctamente!' });
};

exports.makeMove = (req, res) => {
  const { player, attack } = req.body;
  const result = game.attack(player, attack.x, attack.y);
  if (!result.ok) {
    return res.status(400).json({ error: result.msg });
  }
  res.status(200).json(result);
};

exports.getPlayerInfo = (req, res) => {
  const num = parseInt(req.params.playerNumber);
  res.status(200).json(game.info(num));
};
