var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var nif = req.cookies.online;
    var db = req.connection
    db.query('SELECT * FROM ORDEM WHERE client_NIF ='+ nif ,function(err2,docs){
        if(!err2){
            res.render('home',{ title: 'Home' , encomendas:docs});
        }
        else{  
            console.log("Ocorreu um erro ao carregar a pagina home")
        }
    })      
})

module.exports = router;