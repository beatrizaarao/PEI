var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var user = require("../models/user")
var formidable = require("formidable")
var fs = require('fs')
/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else {
        res.render('lr', {title: 'Signup'});
    }
  
});

router.post('/',function(req,res,next) {
    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else {
        var form = new formidable.IncomingForm();
        var status = ""

        form.parse(req, function (err, fields, files) {

            console.log(JSON.stringify(fields))
            var db = req.connection;
            //verificar se já existe algum utilizador com o username inserido no formulário
            db.query('SELECT * FROM CLIENT WHERE NIF =' + fields.nif, function (err2, docs) {
                if (!err2) {
                    if (docs.length === 0) {
                        console.log(fields.pass)
                        console.log(fields.cpassword)
                        if (fields.pass != fields.cpassword) {
                            status = "Erro na confirmação de password"
                            res.render('lr', {title: 'Signup', status: status});
                        }
                        else {
                            if(files.foto1.name != ""){
                                var extension = files.foto1.name.split(".")
                                extension = extension[extension.length-1]
                                fields.fotografia = fields.nif + "." + extension


                                fs.rename(files.foto1.path, './images/upload/' + fields.fotografia, function(err1){
                                    if(!err1){
                                        console.log("Ficheiro recebido e guardado com sucesso")
                                    }
                                    else{
                                        console.log("Ocorreram erros na gravação do ficheiro enviado")
                                    }
                                })
                            }

                            fields.name = fields.fname + " " + fields.lname

                            var querysql = "INSERT INTO `CLIENT` (`NAME`, `NIF`, `EMAIL`, `PHONE`, `STREET`, `DOOR_NUMBER`, `CITY`, `COUNTRY`, `ZIP_CODE`, `PASS`, `IS_BLOCKED`, `img_path`, `IS_APPROVED`, `data_registo`) VALUES('" + fields.name + "'," + fields.nif + ",'" + fields.email + "','" + fields.phone + "','" + fields.rua + "'," + fields.porta + ",'" + fields.city + "','" + fields.country + "','" + fields.zip + "','" + fields.pass + "',1,'"+fields.fotografia +"',0,CURDATE())"
                            db.query(querysql, function (err3, result, clint) {
                                db.query("INSERT INTO Task (DESCRIPTION, STATE, Client_NIF, Tipo, dataPedido, Ordem_ID) VALUES('O cliente com o NIF=" + fields.nif + "pretende registar-se na aplicação',0,?,0,CURDATE(),null)", fields.nif, function (err1, result, clint) {
                                    if (!err3) {
                                        status = "Registo Efetuado com sucesso."
                                        console.log("Registo Efetuado com sucesso")
                                        res.redirect("/signin")
                                    }
                                    else {
                                        console.log("Erro ao efetuar o registo:\r\n" + err3 + "\r\n\r\n");
                                        status = " Ocorreu um erro: " + err3
                                        res.render('lr', {title: 'Signup', status: status});
                                    }
                                });
                            });

                        }
                    }
                    else {
                        res.render('lr', {title: 'Signup', status: 'Já existe um utilizador com esse nif'})
                    }
                }
                else {
                    console.log("Erro a adicionar utilizador: " + err2)
                    res.render('lr', {title: 'Signup', status: 'Ocorreu um erro, por favor tente novamente'})
                }
            })

        })
    }
})

module.exports = router;
