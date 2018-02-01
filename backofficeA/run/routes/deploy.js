var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser")
var fs = require('fs')
var formidable = require("formidable")

router.get('/', function(req, res, next) {
    res.render("importar")
});

router.post('/',function(req,res,next){
    var form= new formidable.IncomingForm();
    var status=""
    var db = req.connection;

        form.parse(req,function(err,fields,files){
            if(files.ficheiro!=undefined){
                var contents
                try{
                    contents = fs.readFileSync(files.ficheiro.path,"utf8")
                }
                catch(err){
                    res.render("importar",{status:"Ocorreu um erro na leitura do ficheiro. Por favor tente novamente"})
                    return
                }
                if(contents!=undefined){
                    var separadoPorTipoDeEvento = contents.split(";")
                    for(var tipo in separadoPorTipoDeEvento){
                        var lista = separadoPorTipoDeEvento[tipo]

                        if(lista.indexOf("Company") !== -1){
                            lista = lista.substring(lista.indexOf('[')).split("},")
                            lista = '{"list":'+lista+'}'


                           lista = JSON.parse(lista).list
                            for(elem in lista){


                                console.log(lista[elem])
                                var querysql = "INSERT INTO `DEPLOY` (`NAME`, `EMAIL`, `PHONE`, `ADRESS`, `WEBPAGE_LINK`, `URL_ICON`, `FACEBOOK_LINK`, `TWEETER_LINK`) VALUES('"+ lista[elem].name +"','"+ lista[elem].email + "','" + lista[elem].phone + "','" + lista[elem].adress + "','" + lista[elem].webpage_link + "','" + lista[elem].url_icon + "','" + lista[elem].facebook_link + "','" + lista[elem].tweeter_link + "')"
                                db.query(querysql, function(err3, result, clint) {
                                        if (!err3) {
                                            status = "Deploy feito com sucesso."
                                            console.log("Deploy efectuado com sucesso")
                                            res.redirect("/")
                                        }
                                        else {
                                            console.log("Erro ao fazer Deploy:\r\n" + err3 + "\r\n\r\n");
                                            status = " Ocorreu um erro: " + err3
                                            res.render('importar', {title: 'Deploy', status: status});
                                        }

                                    })

                            }
                        }
                    }
                }
                else{
                    res.render("importar",{status:"Ocorreu um erro na leitura do ficheiro. Por favor tente novamente"})
                    return
                }
            }
            else{
                res.render("importar",{status:"Não foi submetido nenhum ficheiro"})
                return
            }


        })
    })

module.exports = router;