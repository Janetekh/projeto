'use strict';
var cors = require('cors')
var express = require('express'),
  bodyParser = require('body-parser'),
  rotas = require('./controller/rotas.js'),

  //teste
  app = express();
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(function (req, res, next) {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    url = req.url,
    method = req.method;

  next();
});

app.use(express.static('www'));
app.use('/api', rotas);

module.exports = app;
