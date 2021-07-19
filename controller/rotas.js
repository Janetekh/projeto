'use strict';

var express = require('express'),
  model = require('../models/model.js'),

  router = express.Router();



router.route('/lista_emails')
  .get(function(req, res) {
    if(req.body['nome'] != null && req.body['email'] == null){
        model.find({nome:req.body['nome']}, function(err, lista_emails) {
          if (err) {
            res.send(err);

            return;
          }
          res.json(lista_emails);
        });
    }
    else if(req.body['email'] != null && req.body['nome'] == null){
      model.find({email:req.body['email']}, function(err, lista_emails) {
        if (err) {
          res.send(err);

          return;
        }
        res.json(lista_emails);
      });
    }
    else if(req.body['nome'] == null && req.body['email'] == null){
      model.find({}, function(err, lista_emails) {
        if (err) {
          res.send(err);

          return;
        }
        res.json(lista_emails);
      });
    }
    else if(req.body['nome'] != null && req.body['email'] != null){
      model.find({nome:req.body['nome'], email:req.body['email'] }, function(err, lista_emails) {
        if (err) {
          res.send(err);

          return;
        }
        res.json(lista_emails);
      });
    }else model.find({}, function(err, lista_emails) {
      if (err) {
        res.send(err);

        return;
      }
      res.json(lista_emails);
    });
})
  .post(function(req, res) {
    var postData = req.body,
      verifica = {
        type: 'Verificacao',
        mensagem: ''
      };

    if (!postData.nome) {
      verifica.mensagem = 'Campo nome não encontrado';
    }
   
    if (!postData.email) {
      verifica.mensagem = 'Campo de e-mal não preenchido';
    }

    if (verifica.mensagem) {
      res.json(verifica);

      return;
    }

    model.insert(postData, function(err, novo_cadastro) {
      if (err) {
        res.send(err);

        return;
      }

      res.json(novo_cadastro);
    });
  });




  

router.route('/lista_emails/:id')
  .put(function(req, res) {
    model.findOne({
      _id: req.params.id
    }, function(err, usuario) {
      var prop;

      if (err) {
        res.send(err);
        return;
      }

      if (usuario === null) {
        res.json({
          type: 'error',
          mensagem: 'Cadastro não encontrado '
        });
        return;
      }

      for (prop in req.body) {
        if (prop !== '_id') {
          usuario[prop] = req.body[prop];
        }
      }

      model.update({
        _id: usuario._id
      }, usuario, {}, function(err, numReplaced) {
        if (err) {
          res.send(err);

          return;
        }

        res.json({
          type: 'success',
          mensagem: 'Atualização executada com sucesso'
        });
      });
    });
  })
  .get(function(req, res) {
    model.findOne({
      _id: req.params.id
    }, function(err, usuario) {
      if (err) {
        res.send(err);

        return;
      }

      if (usuario === null) {
        res.json({
          type: 'error',
          mensagem: 'Usuario não encotrado '
        });

        return;
      }

      res.json(usuario);
    });
  })
  
  .delete(function(req, res) {
    model.remove({
      _id: req.params.id
    }, function(err, usuario) {
      if (err) {
        res.send(err);
      }

      res.json({
        type: 'success',
        mensagem: 'E-mail excluido com sucesso!'
      });
    });
  });

module.exports = router;
