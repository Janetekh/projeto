'use strict';

var app = require('./app.js'),
  server;

app.set('port', process.env.PORT || 8000);

server = app.listen(app.get('port'), function () {
  console.log('Servidor rodando na porta:', server.address().port);
  console.log('');
});
