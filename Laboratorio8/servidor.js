const http = require('http');

const server = http.createServer((req, res) => {
  console.log("Petición recibida:", req.url);

  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Prueba de servidor');
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
