var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var user = require("../models/user")
var formidable = require("formidable")
var fs = require('fs')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('lr', { title: 'Signup'});
  
});

router.post('/',function(req,res,next) {
  var form= new formidable.IncomingForm();
  var status=""
  
  form.parse(req,function(err,fields,files){
    console.log(JSON.stringify(fields))
    //verificar se todos os campos obrigatorios foram preenchidos
    var requiredFields = Object.keys(user.schema.tree).filter(x in user.schema.tree[x].required === true)
    var emptyField = false
    for(f in requiredFields){
      if(fields[requiredFields[f]] === undefined)
        emptyField=true
    }
    if(emptyField){
      status="Por favor preencha todos os campos obrigatórios"
      res.render('lr',{ title: 'Signup' , status: status  });
    }
    else{
      //verificar se já existe algum utilizador com o username inserido no formulário
      user.find({'username': fields.username},function(err2,docs){
        if(!err2){
          if(docs.length === 0){
            if(fields.password!=fields.cpassword){
              status="Erro na confirmação de password"
              res.render('lr',{ title: 'Signup' , status: status  });
            }
            else{
                new user({
                  nif: fields.nif,
                  email: fields.email,
                  password: fields.password,
                  pnome: fields.fname,
                  unome: fields.lname,
                  ename: fields.ename,
                  phone: fileds.phone,
                  country: fields.country,
                  distrito: fields.distrito,
                  concelho: fields.concelho,
                  codpost: fields.codpost,
                  freguesia: fields.freguesia,
                  morada: fields.morada,
                  info: fields.info
              }).save(function(err3, doc){
                if(!err3){
                  status="Registo Efetuado com sucesso."
                  res.redirect("/signin")
                }
                else{
                  console.log("Erro ao efetuar o registo:\r\n" + err +"\r\n\r\n");
                  status="Ocorreu um erro: "+err3
                  res.render('lr',{ title: 'Signup' , status: status  });
                }
                res.render('lr',{ title: 'Signup' , status: status  });
              });
            }
          }
          else{
            res.render('lr',{title: 'Signup',
                                      status: 'Já existe um utilizador com esse username'})
          }
        }
        else{
          console.log("Erro a adicionar utilizador: "+err2)
          res.render('lr',{title: 'Signup',
                                    status: 'Ocorreu um erro, por favor tente novamente'})
        }
      })
    } 
  })
  
})

module.exports = router;