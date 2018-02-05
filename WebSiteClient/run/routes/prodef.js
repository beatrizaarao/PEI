var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var cookieParser = require("cookie-parser")
var formidable = require("formidable")
//var app = express()
//var bodyParser = require("body-parser")
//app.use(bodyParser.json())
/* GET home page. */


router.get('/', function(req, res, next) {
    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else if(req.cookies.onlineC === undefined){
        res.redirect('/signin')
    }
    else {
        var db = req.connection;
        db.query('SELECT * FROM STEP', function (err, rows) {
            steps = rows;
            db.query('SELECT * FROM SERVICE', function (err, rows) {
                servs = rows;
                db.query('SELECT * FROM OPCAO', function (err, rows) {
                    opts = rows;
                    db.query('SELECT * FROM Incompatibilities' , function (err, rows) {
                        inc = rows;
                        db.query('SELECT * FROM OPTION_has_Incompatibilities', function (err, rows) {
                            optres = rows;
                            res.render('prodef', {
                                title: 'Encomenda',
                                dataSteps: steps,
                                dataServs: servs,
                                dataOpts: opts,
                                dataRes: inc,
                                dataOptRes: optres,
                                NOME: req.cookies.nome,
                                EMAIL: req.cookies.email,
                                PHONE: req.cookies.phone,
                                MORADA: req.cookies.address,
                                SITE: req.cookies.site,
                                FACE: req.cookies.face,
                                TWITTER: req.cookies.twitter,
                                NIF: req.cookies.nif
                            });
                        });
                    });
                });
            });
        });
    }
});

router.post('/',function(req,res,next) {
    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else if(req.cookies.onlineC === undefined){
        res.redirect('/signin')
    }
    else {
        var db = req.connection;
        var queries = [];
        var has_option = 0;
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            console.log("NIF" + req.cookies.onlineC);
            console.log("Data" + fields.dataentrega)

            var params1 = [req.cookies.onlineC, fields.dataentrega];
            db.query('INSERT INTO ORDEM (BEGIN_DATE, CLOSE_DATE, Client_NIF, ASKED_DELIVERY_DATE, STATUS) VALUES (CURDATE(),null,?,?,0)', params1, function (error, result, client) {
                db.query('SELECT MAX(ID_ORDER) as max FROM ORDEM', function (error, result, client) {
                    var idorder = result[0].max;
                    db.query('SELECT * FROM STEP', function (error, result, client) {
                        var steps = result;
                        db.query('SELECT * FROM SERVICE', function (error, result, client) {
                            var service = result;
                            db.query('SELECT * FROM OPCAO', function (error, result, client) {
                                var opcao = result;
                                for (var i = 0; i < steps.length; i++) {
                                    for (var k = 0; k < service.length; k++) {
                                        has_option = 0;
                                        if (service[k].STEP_id_step == steps[i].id_STEP) {
                                            for (var a = 0; a < opcao.length; a++) {
                                                if (opcao[a].SERVICE_id_SERVICE == service[k].id_SERVICE) {
                                                    var pilas = opcao[a].DESCRIPTION;
                                                    if (opcao[a].IS_CHECKBOX == 1 && fields[pilas] == 'on') {
                                                        console.log("vou entrar na bd pela opcao 1111 "+pilas)
                                                        has_option=1;
                                                        queries[queries.length] = "INSERT INTO ORDER_STEP_SERVICE_OPTION (ID_ORDER, id_STEP, id_SERVICE, id_OPTION, SERVICE_valor, opcao_valor, insertionDate) VALUES(" + idorder + "," + steps[i].id_STEP + "," + service[k].id_SERVICE + "," + opcao[a].id_OPTION + ", null, null, curdate()); "
                                                    }
                                                    else if (opcao[a].IS_CHECKBOX == 0 && fields[pilas] != null) {
                                                        has_option=1;
                                                        console.log("vou entrar na bd pela opcao 2222 "+pilas)
                                                        queries[queries.length] = "INSERT INTO ORDER_STEP_SERVICE_OPTION (ID_ORDER, id_STEP, id_SERVICE, id_OPTION, SERVICE_valor, opcao_valor, insertionDate) VALUES(" + idorder + "," + steps[i].id_STEP + "," + service[k].id_SERVICE + "," + opcao[a].id_OPTION + ", null," + fields[pilas]+ ", curdate()); "
                                                    }
                                                }
                                            }
                                            if (has_option == 0) {
                                                if (service[k].IS_CHECKBOX == 1 && fields[service[k].DESCRIPTION] == 'on') {
                                                    console.log("vou entrar na bd pela serviço 1111"+service[k].DESCRIPTION)
                                                    queries[queries.length] = "INSERT INTO ORDER_STEP_SERVICE_OPTION (ID_ORDER, id_STEP, id_SERVICE, id_OPTION, SERVICE_valor, opcao_valor, insertionDate) VALUES(" + idorder + "," + steps[i].id_STEP + "," + service[k].id_SERVICE + ", null, null, null, curdate()); "
                                                }
                                                else if (service[k].IS_CHECKBOX == 0 && fields[service[k].DESCRIPTION] != null) {
                                                    console.log("vou entrar na bd pela serviço 2222"+service[k].DESCRIPTION)
                                                    queries[queries.length] = "INSERT INTO ORDER_STEP_SERVICE_OPTION (ID_ORDER, id_STEP, id_SERVICE, id_OPTION, SERVICE_valor, opcao_valor, insertionDate) VALUES(" + idorder + "," + steps[i].id_STEP + "," + service[k].id_SERVICE + ", null,'" +fields[service[k].DESCRIPTION]+ "',null, curdate()); "
                                                }
                                            }
                                        }
                                    }
                                }
                                var que = "";
                                for (var o = 0; o < queries.length; o++) {
                                    que = que + queries[o];
                                }
                                //console.log("po" + que);
                                db.query(que, function (error, result, client) {
                                    console.log(error);
                                    console.log(result);
                                    console.log(que);
                                    res.redirect("/home");
                                });
                            });
                        });
                    });
                });
            });
        });
    }
});
module.exports = router;