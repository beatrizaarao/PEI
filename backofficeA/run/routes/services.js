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

    var db = req.connection;
    var data = "";
    var steps;
    var servs;
    var opts;
    db.query('SELECT * FROM STEP',function(err,rows){
        steps  = rows;
        db.query('SELECT * FROM SERVICE',function(err,rows){
            servs  = rows;
            db.query('SELECT * FROM OPCAO',function(err,rows){
                opts  = rows;
                res.render('services', { title: 'Services', dataSteps: steps, dataServs: servs, dataOpts: opts });
            });
        });
    });
});


router.post('/serv', function(req, res) {
    var db = req.connection;
    console.log(req.body.definicao);
    var definicao="", composicao="", ponto="", peso="", largurai="", larguraii="", larguraif="", larguraf="", largurafi="", larguraff="", quantidade="",
        caderno="", preparacao="", gasar="", branquear="", meiobranco="", branco="", be="", lavar="", mercerizar="",
        tinturaria="", reativos="", cubas="", pigmentos="", reativosP="", cubasP="", pigmentosP="", dispersosP="", acabamentos="", secar="",
        acabar="", largura="", calandar="", q="", f="", sanforizar="", tumbler="", embalagem="",
        enfestar="", em="", ei="", rm="", nr="", enrolar="", nren="";
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
        if (req.body.largini2 == "1") {
            largurai = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (4, 'Largura Inicial', 'largurai', 1, null, 0);";

            if (parseInt(req.body.numlariniII2)>0) {
                larguraii = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (1, 'LI intervalo inicial', 'larguraii', " + req.body.numlariniII2 +", 4, 0);";
                larguraif = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (2, 'LI intervalo final', 'larguraif', " + req.body.numlariniFF2 +", 4, 0);";
            }
        }
        if (req.body.largfin2 == "1") {
            larguraf="INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (5, 'Largura Final', 'larguraf', 1, null, 0);";

            if (parseInt(req.body.numlarfinII2)>0) {
                largurafi= "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (3, 'LF intervalo inicial', 'largurafi', " + req.body.numlarfinII2 + ", 5, 0);";
                larguraff= "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (4, 'LF intervalo final', 'larguraff', " + req.body.numlarfinFF2 +", 5, 0);";
            }
        }
        if (req.body.quantidade2 == "1") {
            quantidade="INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (8, 'Quantidade', 'quantidade', 1, null, 0);";
        }
        if (req.body.caderno2 == "1") {
            caderno = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (9, 'Caderno de Encargos', 'caderno', 1, null, 0);";
        }

    }

    if (req.body.preparacao == "1") {
        preparacao = "INSERT INTO STEP (id_STEP, NAME, DESCRIPTION) VALUES (2, 'Preparação', 'preparacao');";

        if (req.body.gasar2 == "1") {
            gasar="INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (10, 'Gasar', 'gasar', 2, null, 1);";
        }
        if (req.body.branquear2 == "1") {
            branquear="INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (11, 'Branquear', 'branquear', 2, null, 1);";
            if (req.body.meiobranco2 == "1") {
                meiobranco = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (5, 'Meio Branco', 'meiobranco', null, 11, 1);";
            }
            if (req.body.branco2 == "1") {
                branco = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (6, 'Branco', 'branco', null, 11, 1);";
            }
            if (req.body.be2 == "1") {
                be = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (7, 'BE', 'be', null, 11, 1);";
            }
        }
        if (req.body.lavar2 == "1") {
            lavar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (12, 'Lavar', 'lavar', 2, null, 1);";
        }
        if (req.body.mercerizar2 == "1") {
            mercerizar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (13, 'Mercerizar', 'mercerizar', 2, null, 1);";
        }
    }

    if (req.body.tinturaria == "1") {
        tinturaria = "INSERT INTO STEP (id_STEP, NAME, DESCRIPTION) VALUES (3, 'Tinturaria', 'tinturaria');";
        if (req.body.reativos2 == "1") {
            reativos = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (14, 'Reativos', 'reativos', 3, null, 1);";
        }
        if (req.body.cubas2 == "1") {
            cubas = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (15, 'Cubas', 'cubas', 3, null, 1);";
        }
        if (req.body.pigmentos2 == "1") {
            pigmentos = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (16, 'Pigmentos', 'pigmentos', 3, null, 1);";
        }
        if (req.body.reativosP2 == "1") {
            reativosP = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (17, 'Reativos', 'reativosP', 3, null, 1);";
        }
        if (req.body.cubasP2 == "1") {
            cubasP = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (18, 'Cubas', 'cubasP', 3, null, 1);";
        }
        if (req.body.dispersosP2 == "1") {
            dispersosP = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (19, 'Dispersos', 'dispersosP', 3, null, 1);";
        }
        if (req.body.pigmentosP2 == "1") {
            pigmentosP = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (20, 'Pigmentos', 'pigmentosP', 3, null, 1);";
        }
    }

    if (req.body.acabamentos == "1") {
        acabamentos="INSERT INTO STEP (id_STEP, NAME, DESCRIPTION) VALUES (4, 'Acabamento', 'acabamentos');";
        if (req.body.secar2 == "1") {
            secar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (21, 'Secar', 'secar', 4, null, 1);";
        }
        if (req.body.acabar2 == "1") {
            acabar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (22, 'Acabar', 'acabar', 4, null, 1);";
        }
        if (req.body.largura2 == "1") {
            largura = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (23, 'Largura', 'largura', 4, null, 1);";
        }
        if (req.body.calandar2 == "1") {
            calandar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (24, 'Calandar', 'calandar', 4, null, 1);";
            if (req.body.q2== "1") {
                q = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (8, 'Q', 'q', null, 24, 1);";
            }
            if (req.body.f2== "1") {
                f = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (9, 'F', 'f', null, 24, 1);";
            }
        }
        if (req.body.sanforizar2 == "1") {
            sanforizar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (25, 'Sanforizar', 'sanforizar', 4, null, 1);";
        }
        if (req.body.tumbler2 == "1") {
            tumbler = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (26, 'Tumbler','tumbler', 4, null, 1);";
        }

    }


    if (req.body.embalagem == "1") {
        embalagem = "INSERT INTO STEP (id_STEP, NAME, DESCRIPTION) VALUES (5, 'Embalagem', 'embalagem');";
        if (req.body.enfestar2 == "1") {
            enfestar="INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (27, 'Enfestar', 'enfestar', 5, null, 1);";
            if (req.body.em2== "1") {
                em = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (10, 'EM', 'em', null, 27, 1);";
            }
            if (req.body.ei2== "1") {
                ei="INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (11, 'EI', 'ei', null, 27, 1);";
            }
            if (req.body.rm2== "1") {
                rm = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (12, 'RM', 'rm', null, 27, 1);";
            }
            if (req.body.nr2>0== "1") {
                nr = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (13, 'Nº/peça', 'quantenf', null, 27, 0);";
            }
        }
        if (req.body.enrolar2 == "1") {
            enrolar = "INSERT INTO SERVICE (id_SERVICE, NAME, DESCRIPTION, STEP_id_step, VALOR, IS_CHECKBOX) VALUES (28, 'Enrolar', 'enrolar', 5, null, 1);";
            if (req.body.nren2== "1") {
                nren = "INSERT INTO OPCAO (id_OPTION, NAME, DESCRIPTION, VALOR, SERVICE_id_SERVICE, IS_CHECKBOX) VALUES (9, 'Nº/peça', 'quantenr', null, 28, 0);";
            }
        }
    }

    var sql = definicao+ composicao+ ponto+ peso+ largurai+ larguraii+ larguraif+ larguraf+ largurafi+ larguraff+ quantidade+ caderno+
        preparacao+ gasar+ branquear+ meiobranco+ branco+ be+ lavar+ mercerizar+ tinturaria+ reativos+ cubas+ pigmentos+ reativosP+
        cubasP+ pigmentosP+ dispersosP+ acabamentos+ secar+ acabar+ largura+ calandar+ q+f+ sanforizar+ tumbler+ embalagem+
        enfestar+ em+ ei+ rm+ nr+ enrolar+ nren;

    console.log(sql);

    db.query(sql,function (error, result, client) {
        console.log(result);
        console.log(error);
        res.redirect('/services');
    });

});


module.exports = router;
