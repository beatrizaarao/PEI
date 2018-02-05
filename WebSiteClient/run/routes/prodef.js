var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var formidable = require("formidable")
/* GET home page. */


router.get('/', function(req, res, next) {
    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else if(req.cookies.onlineC === undefined){
        res.redirect('/signin')
    }
    else {
        res.render('prodef', {title: 'Encomenda', NOME: req.cookies.nome, EMAIL: req.cookies.email, PHONE: req.cookies.phone, MORADA: req.cookies.address, SITE: req.cookies.site, FACE: req.cookies.face, TWITTER: req.cookies.twitter, NIF: req.cookies.nif});
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
                                                    console.log("ENTREI na opcao" + opcao[a].DESCRIPTION);
                                                    if ((opcao[a].IS_CHECKBOX == 1 && fields[pilas] == 'on') || (opcao[a].IS_CHECKBOX == 0 && fields[pilas] != null)) {
                                                        console.log("ENTREI na opcao" + opcao[a].DESCRIPTION);

                                                        has_option = 1;
                                                        queries[queries.length] = "INSERT INTO ORDER_STEP_SERVICE_OPTION (ID_ORDER, id_STEP, id_SERVICE, id_OPTION) VALUES(" + idorder + "," + steps[i].id_STEP + "," + service[k].id_SERVICE + "," + opcao[a].id_OPTION + "); "

                                                    }
                                                }
                                            }
                                            if (has_option == 0) {
                                                if ((service[k].IS_CHECKBOX == 1 && fields[service[k].DESCRIPTION] == 'on') || (service[k].IS_CHECKBOX == 0 && fields[service[k].DESCRIPTION] != null)) {

                                                    //var params3 = [idorder,steps[i].id_STEP,service[k].id_SERVICE];
                                                    queries[queries.length] = "INSERT INTO ORDER_STEP_SERVICE_OPTION (ID_ORDER, id_STEP, id_SERVICE) VALUES(" + idorder + "," + steps[i].id_STEP + "," + service[k].id_SERVICE + "); "
                                                }
                                            }
                                        }
                                    }
                                }
                                var que = "";
                                for (var o = 0; o < queries.length; o++) {
                                    //console.log("que" + queries[o]);
                                    que = que + queries[o];
                                }
                                //console.log("po" + que);
                                db.query(que, function (error, result, client) {
                                    var mailOptions = {
                                        from: req.cookies.email,
                                        to: req.cookies.email,
                                        subject: "Nova Encomenda",
                                        text: "Possui uma nova encomenda"
                                    };

                                    transp.sendMail(mailOptions, function (error, info) {
                                        if (error) {
                                            console.log(error);
                                            res.json({yo: 'error'});
                                        } else {
                                            console.log('Message sent: ' + info.response);
                                            res.json({yo: info.response});
                                        }
                                        ;
                                    });
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