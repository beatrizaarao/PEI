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
      var db = req.connection;
      //verificar se já existe algum utilizador com o username inserido no formulário
      db.query('SELECT * FROM CLIENT WHERE NIF ='+ fields.nif ,function(err2,docs){
        if(!err2){
          if(docs.length === 0){
            if(fields.pass!=fields.cpassword){
              status="Erro na confirmação de password"
              res.render('lr',{ title: 'Signup' , status: status  });
            }
            else{
                fields.name = fields.fname + " " + fields.lname

                var querysql = "INSERT INTO `CLIENT` (`NAME`, `NIF`, `EMAIL`, `PHONE`, `STREET`, `DOOR_NUMBER`, `CITY`, `COUNTRY`, `ZIP_CODE`, `PASS`, `IS_BLOCKED`, `img_path`, `IS_APPROVED`, `data_registo`) VALUES('"+ fields.name +"',"+ fields.nif + ",'" + fields.email + "','" + fields.phone + "','" + fields.rua + "'," + fields.porta + ",'" + fields.city + "','" + fields.country + "','" + fields.zip + "','" + fields.pass + "',1,NULL,0,CURDATE())"

                db.query(querysql, function(err3, result, clint){
                    if(!err3){
                      status="Registo Efetuado com sucesso."
                        console.log("Registo Efetuado com sucesso")
                      res.redirect("/signin", {status:status})
                    }
                    else{
                      console.log("Erro ao efetuar o registo:\r\n" + err3 +"\r\n\r\n");
                      status=" Ocorreu um erro: "+err3
                      res.render('lr',{ title: 'Signup' , status: status  });
                    }
                res.render('lr',{ title: 'Signup' , status: status  });
              })
            }
          }
          else{
            res.render('lr',{title: 'Signup', status: 'Já existe um utilizador com esse nif'})
          }
        }
        else{
          console.log("Erro a adicionar utilizador: " + err2)
          res.render('lr',{title: 'Signup', status: 'Ocorreu um erro, por favor tente novamente'})
        }
      })

  })

})

module.exports = router;
