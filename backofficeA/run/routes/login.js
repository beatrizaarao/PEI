var express = require('express');
var router = express.Router();

    /* Requisição GET para página de LOGIN. */
router.get('/', function(req, res) {
    // Mostra a página de Login com qualquer mensagem flash, caso exista
    var db = req.connection;
    db.query('SELECT * FROM DEPLOY' , function(error, result, client){
        if (result.length == 0){
            res.redirect('/importar')
        }
        else {
            res.cookie('deploy', 1)
            res.render('login')
        }
    })
})

router.post('/', function(req, res){

    if(req.cookies.deploy === undefined){
        res.redirect('/')
    }
    else {

        var db = req.connection;
        db.query('SELECT * FROM ADMINISTRATOR WHERE EMAIL=?', req.body.email, function (error, result, client) {
            if (result.length != 0) {
                if (result[0].PASSWORD == req.body.password) {
                    db.query('UPDATE ADMINISTRATOR SET IS_LOGGED=1 WHERE EMAIL=?', req.body.email, function (error, result, client) {
                        res.cookie('online', req.body.email)
                        res.redirect('/index');
                    });
                }
                else {
                    res.render('login', {flash: "Password errada"})
                }
            }
            else {
                res.render('login', {flash: "O utilizador inserido não existe"})
            }
        })
    }
})

router.get('/logout', function(req, res){

    if(req.cookies.deploy === undefined){
        res.redirect('/')
    }
    else {
        res.clearCookie("online")
        res.redirect('/');
    }
})


module.exports = router