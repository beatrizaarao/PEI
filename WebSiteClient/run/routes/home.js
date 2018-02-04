var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else if(req.cookies.onlineC === undefined){
        res.redirect('/signin')
    }
    else {

        var nif = req.cookies.onlineC;
        var db = req.connection
        db.query('SELECT * FROM ORDEM WHERE client_NIF =' + nif, function (err2, docs) {
            if (!err2) {
                res.render('home', {title: 'Home', encomendas: docs,NOME: req.cookies.nome, EMAIL: req.cookies.email, PHONE: req.cookies.phone, MORADA: req.cookies.address, SITE: req.cookies.site, FACE: req.cookies.face, TWITTER: req.cookies.twitter, NIF: req.cookies.nif});
            }
            else {
                console.log("Ocorreu um erro ao carregar a pagina home")
            }
        })
    }
})

router.get('/alterar/:orderID', function(req, res, next) {

    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else if(req.cookies.onlineC === undefined){
        res.redirect('/signin')
    }
    else {
        var db2 = req.connection
        db2.query("INSERT INTO Task (DESCRIPTION, STATE, Client_NIF, Tipo, dataPedido, Ordem_ID) VALUES('O cliente com o NIF=" + req.cookie.onlineC + "pretende alterar a encomenda"+req.params.ordemID +"',0,?,2,CURDATE(),'"+req.params.ordemID+"')", req.cookie.onlineC , function (err1, result, clint) {
                res.redirect("/home")
        })

        var nif = req.cookies.onlineC;
        var db = req.connection
        db.query('SELECT * FROM ORDEM WHERE client_NIF =' + nif, function (err2, docs) {
            if (!err2) {
                res.render('home', {title: 'Home', encomendas: docs});
            }
            else {
                console.log("Ocorreu um erro ao carregar a pagina home")
            }
        })
    }
})

router.get('/cancelar/:orderID', function(req, res, next) {

    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else if(req.cookies.onlineC === undefined){
        res.redirect('/signin')
    }
    else {

        var db2 = req.connection
        db2.query("INSERT INTO Task (DESCRIPTION, STATE, Client_NIF, Tipo, dataPedido, Ordem_ID) VALUES('O cliente com o NIF=" + req.cookies.onlineC + "pretende cancelar a encomenda"+req.params.ordemID +"',0,?,1,CURDATE(),'"+req.params.ordemID+"')", req.cookies.onlineC , function (err1, result, clint) {
            res.redirect("/home")
        })

        var nif = req.cookies.onlineC;
        var db = req.connection
        db.query('SELECT * FROM ORDEM WHERE client_NIF =' + nif, function (err2, docs) {
            if (!err2) {
                res.render('home', {title: 'Home', encomendas: docs});
            }
            else {
                console.log("Ocorreu um erro ao carregar a pagina home")
            }
        })
    }
})

module.exports = router;