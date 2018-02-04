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

module.exports = router;