var express = require('express');
var router = express.Router();
const TreeMap = require("treemap-js");

/* GET home page. */
router.get('/:orderID', function(req, res, next) {
    var stepService = new TreeMap();
    var serviceOption = new TreeMap();
    var steps = [];
    var services =  [];
    var array = new Array();
    var array2 = new Array();
    if (req.cookies.deploy === undefined) {
        res.redirect('/')
    }
    else if (req.cookies.online === undefined) {
        res.redirect('/')
    }
    else {

        var db = req.connection;
        db.query("SELECT COUNT(idMESSAGES) AS mg FROM ADMIN_MESSAGE WHERE Tipo=0 and IS_READ=1", function (error, result, client) {
            req.app.locals.inbox = result[0].mg;
            db.query("SELECT COUNT(ID_ORDER) AS ord FROM ORDEM WHERE STATUS=0", function (error, result, client) {
                req.app.locals.missedOrders = result[0].ord;
                db.query("SELECT COUNT(ID_TASK) AS tamanho FROM Task WHERE STATE=0", function (error, result, client) {
                    req.app.locals.missedMenu = result[0].tamanho;
                    db.query("SELECT * FROM ORDEM WHERE ID_ORDER=?", req.params.orderID, function (error, result, client) {
                        var ordem = result;
                        db.query("SELECT * FROM ORDER_STEP_SERVICE_OPTION WHERE ID_ORDER=?", req.params.orderID, function (error, result, client) {
                            var results = result;
                            var total = results.length;
                            var count = 0;
                            for (var i = 0; i < total; i++) {
                                (function (foo) {
                                    array = [];
                                    var currentStep = results[foo].id_STEP;
                                    var currentServiceID = results[foo].id_SERVICE;
                                    var currentOptionID = results[foo].id_OPTION;
                                    db.query("SELECT NAME FROM STEP WHERE id_STEP=?", currentStep, function (error, result, client) {
                                        var stepName = result[0].NAME
                                        if (steps.includes(stepName) == false) {
                                            steps.push(stepName);
                                        }
                                        db.query("SELECT NAME FROM SERVICE WHERE id_SERVICE=?", currentServiceID, function (error, result, client) {
                                            var serviceName = result[0].NAME
                                            services.push(serviceName);
                                            db.query("SELECT NAME FROM OPCAO WHERE id_OPTION=?", currentOptionID, function (error, result, client) {
                                                if (result != null) {
                                                    var optionName = result[0].NAME
                                                    array2 = serviceOption.get(serviceName);

                                                    if (array2 == undefined) {
                                                        if (results[foo].opcao_valor == null) {
                                                            array2 = [optionName];
                                                        }
                                                        else {
                                                            array2 = [optionName + ": " + results[foo].opcao_valor];
                                                        }

                                                        serviceOption.set(serviceName, array2);
                                                    }
                                                    else {
                                                        if (results[foo].opcao_valor == null) {
                                                            array2.push(optionName);
                                                        }
                                                        else {
                                                            array2.push(optionName + ": " + results[foo].opcao_valor);
                                                        }

                                                    }
                                                }
                                                array = stepService.get(stepName);
                                                if (array == undefined) {
                                                    if (results[foo].SERVICE_valor == null) {
                                                        array = [serviceName];
                                                    }
                                                    else {
                                                        array = [serviceName + ": " + results[foo].SERVICE_valor];
                                                    }

                                                    stepService.set(stepName, array);
                                                }
                                                else {
                                                    if (array.includes(serviceName) == false) {
                                                        if (results[foo].SERVICE_valor == null) {
                                                            array.push(serviceName);
                                                        }
                                                        else {
                                                            array.push(serviceName + ": " + results[foo].SERVICE_valor);
                                                        }

                                                    }
                                                }
                                                count++;
                                                if (count > total - 1) done();
                                            });
                                        });
                                    });
                                }(i))
                            }
                            ;
                        });
                        function done() {
                            //console.log(serviceOption.getTree());
                            res.render('orderInfo', {
                                title: 'Informação Encomenda',
                                stepService: stepService,
                                steps: steps,
                                services: services,
                                serviceOption: serviceOption,
                                ordem: ordem,
                                mail: req.cookies.email,
                                nome: req.cookies.nome
                            });
                        }


                    });
                });
            });
        });
    }
});

router.post('/exportar/:ordemID', function(req, res, next) {

    if(req.cookies.deploy === undefined){
        res.redirect('/')
    }else if (req.cookies.online === undefined){
        res.redirect('/')
    }
    else{
        var db = req.connection;
        db.query("UPDATE ORDEM set STATUS = 1 where ID_ORDER=?",req.params.ordemID, function (error, result, client) {
            res.redirect('/orderInfo/' + req.params.ordemID);
        });}
});

router.put('/encomendas/:id', function (req, res) {
    if(req.cookies.deploy === undefined){
        res.redirect('/')
    }    else if (req.cookies.online === undefined){
        res.redirect('/')
    }
    else {
        var db = req.connection;
        console.log("caganita" + req.params.id);
        db.query("SELECT ID_TASK FROM Task WHERE Ordem_ID=? and Tipo=1", req.params.id, function (error, result, client) {
            task = result[0].ID_TASK
            db.query("UPDATE ORDEM SET STATUS=2 WHERE ID_ORDER=?", req.params.id, function (error, result, client) {
                db.query("UPDATE TASK SET STATE=1 WHERE ID_TASK=?", task, function (error, result, client) {
                    req.app.locals.missedMenu = req.app.locals.missedMenu - 1
                    res.redirect('/tasks');
                });
            });
        });

    }
});

module.exports = router;