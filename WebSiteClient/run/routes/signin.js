var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var user = require("../models/user")
var formidable = require("formidable")
var mongoose = require("mongoose")
var util = require("util");
var fs = require("fs");
var path = require('path');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lr', { title: 'Login'});
});

router.post('/',function(req,res,next) {
    var db = req.connection;
  var form= new formidable.IncomingForm();
  var status=""
  form.parse(req,function(err,fields,files){
      db.query('SELECT * FROM CLIENT WHERE NIF =' + fields.nif,function(err2,docs){
      if(!err2){
        if(docs.length>0){
          // nao é suposto haver mais do que um resultado
          if(docs[0].password === fields.password){
            res.cookie('online', fields.nif)
            res.redirect('/order')
          }
          else{
            res.render('lr', { title: 'Login' , status: 'Password errada para o utilizador inserido'});
          }
        }
        else{
          res.render('lr', { title: 'Login' , status: 'Não existe nenhum utilizador com esse nome'});
        }

      }
      else{
        console.log("Occoreu um erro ao fazer o login do user "+fields.nif + " : \r\n"+err2+"\r\n\r\n")
        res.render('lr', { title: 'Login' , status: 'Ocorreu um erro, por favor tente novamente'});
      }

    })
  })

})

module.exports = router;