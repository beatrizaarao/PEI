var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var cookieParser = require("cookie-parser")
var formidable = require("formidable")
/* GET home page. */


router.get('/', function(req, res, next) {
    res.render('prodef', { title: 'Encomenda'});
});

router.post('/',function(req,res,next) {
        var db = req.connection;
        var queries = [];
        var has_option = 0;
        var form= new formidable.IncomingForm();
        form.parse(req,function(err,fields,files){
            console.log("NIF" + req.cookies.online);
            console.log("Data" + fields.dataentrega)

            var params1 = [req.cookies.online, fields.dataentrega];
            db.query('INSERT INTO ORDEM (BEGIN_DATE, CLOSE_DATE, Client_NIF, ASKED_DELIVERY_DATE, STATUS) VALUES (CURDATE(),null,?,?,0)',params1,function(error, result, client) {
                db.query('SELECT MAX(ID_ORDER) as max FROM ORDEM', function (error, result, client) {
                    var idorder= result[0].max;
                    db.query('SELECT * FROM STEP', function (error, result, client) {
                        var steps = result;
                        db.query('SELECT * FROM SERVICE', function (error, result, client) {
                            var service = result;
                            db.query('SELECT * FROM OPCAO', function (error, result, client) {
                                var opcao = result;
                                for (var i = 0; i < steps.length; i++) {
                                   // console.log("PUTA QUE PARIU3" + steps[i].DESCRIPTION + i)
                                    for (var k = 0; k < service.length; k++) {
                                        has_option=0;
                                        if(service[k].STEP_id_step==steps[i].id_STEP)
                                        {
                                            //console.log("PUTA QUE PARIU2" + service[k].DESCRIPTION + k)
                                            for (var a = 0; a < opcao.length; a++){
                                                if(opcao[a].SERVICE_id_SERVICE==service[k].id_SERVICE){
                                                    //console.log("PUTA QUE PARIU" + opcao[a].DESCRIPTION + a)
                                                    var pilas = opcao[a].DESCRIPTION;
                                                    if ((opcao[a].IS_CHECKBOX == 1 && fields[pilas] == 'on')||(opcao[a].IS_CHECKBOX == 0 && fields[pilas]!=null)) {
                                                        //console.log("ENTREI na opcao" + opcao[a].DESCRIPTION);

                                                            has_option=1;
                                                            //console.log("DENTRO" + opcao[a].DESCRIPTION);
                                                            //console.log(steps[i]);
                                                            //var params2 = [idorder,steps[i].id_STEP,service[k].id_SERVICE,opcao[a].id_OPTION];
                                                            queries[queries.length] = "INSERT INTO ORDER_STEP_SERVICE_OPTION (ID_ORDER, id_STEP, id_SERVICE, id_OPTION) VALUES(" +idorder+","+steps[i].id_STEP +","+service[k].id_SERVICE+","+opcao[a].id_OPTION+"); "
                                                            /*
                                                            db.query('INSERT INTO ORDER_STEP_SERVICE_OPTION (ID_ORDER, id_STEP, id_SERVICE, id_OPTION) VALUES(?,?,?,?)',params2, function (err, result) {
                                                                if (err) throw err;
                                                                console.log("1 record inserted");
                                                            });
                                                            */

                                                    }
                                                }
                                            }
                                            if (has_option==0) {
                                                if ((service[k].IS_CHECKBOX == 1 && fields[service[k].DESCRIPTION] == 'on')||(service[k].IS_CHECKBOX == 0 && fields[service[k].DESCRIPTION]!=null)) {
                                                    //var params3 = [idorder,steps[i].id_STEP,service[k].id_SERVICE];
                                                    queries[queries.length] = "INSERT INTO ORDER_STEP_SERVICE_OPTION (ID_ORDER, id_STEP, id_SERVICE) VALUES(" +idorder+","+steps[i].id_STEP +","+service[k].id_SERVICE+"); "
                                                }
                                            }
                                        }
                                    }
                                }
                                var que = "";
                                for(var o=0;o<queries.length;o++){
                                    //console.log("que" + queries[o]);
                                    que= que + queries[o];
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

});
module.exports = router;