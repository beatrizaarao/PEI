var express = require('express');
var router = express.Router();
var util = require("util");
var fs = require("fs");
var path = require('path');
var url = require('url');
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies.deploy === undefined){
        res.redirect('/')
    }    else if (req.cookies.online === undefined){
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
                    var data = "";
                    var steps;
                    var servs;
                    var opts;
                    var inc;
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
                                        res.render('services', {
                                            title: 'Services',
                                            dataSteps: steps,
                                            dataServs: servs,
                                            dataOpts: opts,
                                            dataRes: inc,
                                            dataOptRes: optres,
                                            mail: req.cookies.email,
                                            nome: req.cookies.nome
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }
});


router.post('/serv', function(req, res) {
    if(req.cookies.deploy === undefined){
        res.redirect('/')
    }
    else if (req.cookies.online === undefined){
        res.redirect('/')
    }
    else {
        var db = req.connection;
        var definicao = "", composicao = "", ponto = "", peso = "", largurai = "", larguraii = "", larguraif = "", larguraf = "", largurafi = "", larguraff = "", quantidade = "",
            caderno = "", preparacao = "", gasar = "", branquear = "", meiobranco = "", branco = "", be = "", lavar = "", mercerizar = "",
            tinturaria = "", reativos = "", cubas = "", pigmentos = "", reativosP = "", cubasP = "", pigmentosP = "", dispersosP = "", acabamentos = "", secar = "",
            acabar = "", largura = "", calandar = "", q = "", f = "", sanforizar = "", tumbler = "", embalagem = "",
            enfestar = "", em = "", ei = "", rm = "", nr = "", enrolar = "", nren = "";
        if (req.body.definicao == "1") {
            definicao = "INSERT INTO STEP (id_STEP, NAME, DESCRIPTION) VALUES (1, 'Definição do Produto', 'defProduto');";
            if (req.body.composicao2 == "1") {
                composicao = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (1, 'Composição', 'composicao', 1, null, 0);";
            }
            if (req.body.ponto2 == "1") {
                ponto = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (2, 'Ponto', 'ponto', 1, null, 0);";
            }
            if (req.body.peso2 == "1") {
                peso = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (3, 'Peso', 'peso', 1, null, 0);";
            }
            if (req.body.largurai2 == "1") {
                largurai = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (4, 'Largura Inicial', 'largurai', 1, null, 0);";

                if (parseInt(req.body.larguraii2) > 0) {
                    larguraii = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (1, 'LI intervalo inicial', 'larguraii', " + req.body.numlariniII2 + ", 4, 0);";
                    larguraif = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (2, 'LI intervalo final', 'larguraif', " + req.body.numlariniFF2 + ", 4, 0);";
                }
            }
            if (req.body.larguraf2 == "1") {
                larguraf = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (5, 'Largura Final', 'larguraf', 1, null, 0);";

                if (parseInt(req.body.largurafi2) > 0) {
                    largurafi = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (3, 'LF intervalo inicial', 'largurafi', " + req.body.numlarfinII2 + ", 5, 0);";
                    larguraff = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (4, 'LF intervalo final', 'larguraff', " + req.body.numlarfinFF2 + ", 5, 0);";
                }
            }
            if (req.body.quantidade2 == "1") {
                quantidade = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (6, 'Quantidade', 'quantidade', 1, null, 0);";
            }
            if (req.body.caderno2 == "1") {
                caderno = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (7, 'Caderno de Encargos', 'caderno', 1, null, 0);";
            }

        }

        if (req.body.preparacao == "1") {
            preparacao = "INSERT INTO STEP (id_STEP, NAME, DESCRIPTION) VALUES (2, 'Preparação', 'preparacao');";

            if (req.body.gasar2 == "1") {
                gasar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (8, 'Gasar', 'gasar', 2, null, 1);";
            }
            if (req.body.branquear2 == "1") {
                branquear = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (9, 'Branquear', 'branquear', 2, null, 1);";
                if (req.body.meiobranco2 == "1") {
                    meiobranco = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (5, 'Meio Branco', 'meiobranco', null, 9, 1);";
                }
                if (req.body.branco2 == "1") {
                    branco = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (6, 'Branco', 'branco', null, 9, 1);";
                }
                if (req.body.be2 == "1") {
                    be = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (7, 'BE', 'be', null, 9, 1);";
                }
            }
            if (req.body.lavar2 == "1") {
                lavar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (10, 'Lavar', 'lavar', 2, null, 1);";
            }
            if (req.body.mercerizar2 == "1") {
                mercerizar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (11, 'Mercerizar', 'mercerizar', 2, null, 1);";
            }
        }

        if (req.body.tinturaria == "1") {
            tinturaria = "INSERT INTO STEP (id_STEP, NAME, DESCRIPTION) VALUES (3, 'Tinturaria', 'tinturaria');";
            if (req.body.reativos2 == "1") {
                reativos = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (12, 'Reativos', 'reativos', 3, null, 1);";
            }
            if (req.body.cubas2 == "1") {
                cubas = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (13, 'Cubas', 'cubas', 3, null, 1);";
            }
            if (req.body.pigmentos2 == "1") {
                pigmentos = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (14, 'Pigmentos', 'pigmentos', 3, null, 1);";
            }
            if (req.body.reativosP2 == "1") {
                reativosP = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (15, 'Reativos', 'reativosP', 3, null, 1);";
            }
            if (req.body.cubasP2 == "1") {
                cubasP = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (16, 'Cubas', 'cubasP', 3, null, 1);";
            }
            if (req.body.dispersosP2 == "1") {
                dispersosP = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (17, 'Dispersos', 'dispersosP', 3, null, 1);";
            }
            if (req.body.pigmentosP2 == "1") {
                pigmentosP = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (18, 'Pigmentos', 'pigmentosP', 3, null, 1);";
            }
        }

        if (req.body.acabamentos == "1") {
            acabamentos = "INSERT INTO STEP (id_STEP, NAME, DESCRIPTION) VALUES (4, 'Acabamento', 'acabamentos');";
            if (req.body.secar2 == "1") {
                secar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (19, 'Secar', 'secar', 4, null, 1);";
            }
            if (req.body.acabar2 == "1") {
                acabar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (20, 'Acabar', 'acabar', 4, null, 1);";
            }
            if (req.body.largura2 == "1") {
                largura = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (21, 'Largura', 'largura', 4, null, 1);";
            }
            if (req.body.calandar2 == "1") {
                calandar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (22, 'Calandar', 'calandar', 4, null, 1);";
                if (req.body.q2 == "1") {
                    q = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (8, 'Q', 'q', null, 22, 1);";
                }
                if (req.body.f2 == "1") {
                    f = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (9, 'F', 'f', null, 22, 1);";
                }
            }
            if (req.body.sanforizar2 == "1") {
                sanforizar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (23, 'Sanforizar', 'sanforizar', 4, null, 1);";
            }
            if (req.body.tumbler2 == "1") {
                tumbler = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (24, 'Tumbler','tumbler', 4, null, 1);";
            }

        }


        if (req.body.embalagem == "1") {
            embalagem = "INSERT INTO STEP (id_STEP, NAME, DESCRIPTION) VALUES (5, 'Embalagem', 'embalagem');";
            if (req.body.enfestar2 == "1") {
                enfestar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (25, 'Enfestar', 'enfestar', 5, null, 1);";
                if (req.body.em2 == "1") {
                    em = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (10, 'EM', 'em', null, 25, 1);";
                }
                if (req.body.ei2 == "1") {
                    ei = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (11, 'EI', 'ei', null, 25, 1);";
                }
                if (req.body.rm2 == "1") {
                    rm = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (12, 'RM', 'rm', null, 25, 1);";
                }
                if (req.body.nr2 > 0 == "1") {
                    nr = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (13, 'Nº/peça', 'quantenf', null, 25, 0);";
                }
            }
            if (req.body.enrolar2 == "1") {
                enrolar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (26, 'Enrolar', 'enrolar', 5, null, 1);";
                if (req.body.nren2 == "1") {
                    nren = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (14, 'Nº/peça', 'quantenr', null, 26, 0);";
                }
            }
        }

        var sql = definicao + composicao + ponto + peso + largurai + larguraii + larguraif + larguraf + largurafi + larguraff + quantidade + caderno +
            preparacao + gasar + branquear + meiobranco + branco + be + lavar + mercerizar + tinturaria + reativos + cubas + pigmentos + reativosP +
            cubasP + pigmentosP + dispersosP + acabamentos + secar + acabar + largura + calandar + q + f + sanforizar + tumbler + embalagem +
            enfestar + em + ei + rm + nr + enrolar + nren;

        console.log(sql);

        db.query(sql, function (error, result, client) {
            console.log(result);
            console.log(error);
            res.redirect('/services');
        });
    }
});


module.exports = router;
