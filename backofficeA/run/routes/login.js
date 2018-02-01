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
    res.render('login')
        }
    })
})

router.post('/', function(req, res){


        var db = req.connection;
        db.query('SELECT * FROM ADMINISTRATOR WHERE EMAIL=?',req.body.email, function(error, result, client){
            if (result.length!=0){
                if(result[0].PASSWORD==req.body.password){
                    db.query('UPDATE ADMINISTRATOR SET IS_LOGGED=1 WHERE id_ADMINISTRATOR=1', function(error, result, client){
                        res.app.locals.admin.IS_LOGGED=1;
                        res.redirect('/index');
                    });
                }
                else{res.render('login', {flash: "Password errada"})}
            }
            else{res.render('login', {flash: "O utilizador inserido não existe"})}
        })
        })

router.post('/logout', function(req, res){

    res.app.locals.admin.IS_LOGGED=0;
    res.redirect('/');
})


module.exports = router