var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.cookies.deploy === undefined){
        res.redirect('/')
    }
    else if (req.cookies.online === undefined){
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
                    db.query("SELECT * FROM ADMINISTRATOR WHERE Username=?",req.cookies.online, function (error, result, client) {
                        var admin = result[0];
                        res.render('perfilAdmin', {
                            title: 'Administrador',
                            mail: req.cookies.email,
                            nome: req.cookies.nome,
                            ADDRESS: req.cookies.address,
                            PHONE: req.cookies.phone,
                            SITE: req.cookies.site,
                            FACE: req.cookies.face,
                            TWITTER: req.cookies.twitter,
                            NIF: req.cookies.nif,
                            ADMIN: admin
                        });

                    });

                });
            });
        });
    }
});

router.post('/update', function(req, res, next) {
   var db = req.connection;
   params1 = [req.body.user, req.body.pass, req.cookies.online];
   params2= [req.body.name, req.body.email, req.body.phone, req.body.address, req.body.site, req.body.face, req.body.twitter, req.body.nif, req.body.nif];
   console.log(params1);
    console.log(params2);

   db.query("Update DEPLOY SET NAME=?, EMAIL=?, PHONE=?, ADRESS=?, WEBPAGE_LINK=?, FACEBOOK_LINK=?, TWITTER_LINK=?, NIF=? WHERE NIF=?", params2, function (error, result, client) {
       db.query("Update ADMINISTRATOR SET Username=?, PASSWORD=? WHERE Username=?",params1, function (error, result, client) {
           req.cookies.email= req.body.email;
           req.cookies.nome= req.body.name;
           req.cookies.address= req.body.address;
           req.cookies.phone= req.body.phone;
           req.cookies.site= req.body.site;
           req.cookies.face= req.body.face;
           req.cookies.twitter= req.body.twitter;
           req.cookies.nif= req.body.name;
           req.cookies.online= req.body.user;
           res.redirect("/perfilAdmin");
       });
    });

});


module.exports = router;