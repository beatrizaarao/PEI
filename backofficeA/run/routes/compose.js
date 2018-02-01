var express = require('express');
var router = express.Router();
var Isemail = require('isemail');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.connection;
    db.query("SELECT COUNT(idMESSAGES) AS mg FROM ADMIN_MESSAGE WHERE Tipo=0 and IS_READ=1", function (error, result, client) {
        req.app.locals.inbox = result[0].mg;
        db.query("SELECT COUNT(ID_ORDER) AS ord FROM ORDEM WHERE STATUS=0", function (error, result, client) {
            req.app.locals.missedOrders = result[0].ord;
            db.query("SELECT COUNT(ID_TASK) AS tamanho FROM Task WHERE STATE=0", function (error, result, client) {
                req.app.locals.missedMenu = result[0].tamanho;
                if(req.app.locals.admin.IS_LOGGED==1){
                    res.render('compose', { title: 'Compor', email: "example@email.com...", assunto: "Inserir assunto...", mensagem: "Inserir mensagem..."});
                }
                else {res.redirect('/')}
            });
        });
    });
});

router.post('/', function(req, res, next){
    var db = req.connection;
    var transp = req.transporter;
    var email = req.body.email;
    var assunto = req.body.assunto;
    var mensagem = req.body.mensagem;
    if(Isemail.validate(email)==false){
        console.log(res.render('compose', { title: 'Compor', status: 'O email fornecido não é válido', email: email, assunto: assunto, mensagem: mensagem}));
    }
    else{
        var mailOptions = {
            from: 'encomenda.uniline@gmail.com',
            to: email,
            subject: assunto,
            text: mensagem
        };

        transp.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });
            var params=[assunto, mensagem,email]
            db.query("INSERT INTO ADMIN_MESSAGE (SUBJECT, CONTENT, client_mail, Tipo, IS_READ, IS_FAVORITE, Data) VALUES (?,?, ?, 1,1,0,CURRENT_DATE)",params, function (error, result, client) {
                console.log("ENTREI");
                res.redirect('/messages');
            });

    }

});

router.post('/clientInfo/:nif', function(req, res, next) {
    var db = req.connection;
    db.query("Select EMAIL from Client where NIF=?",req.params.nif, function (error, result, client) {
        var email= result;
        res.render('compose', { title: 'Compor', emailDefault: email[0].EMAIL, assunto: "Inserir assunto...", mensagem: "Inserir mensagem..."});
    });
});

router.post('/clientInfo/bymail/:mail/:idmessage', function(req, res, next) {
    var db = req.connection;
    db.query("select IS_READ FROM ADMIN_MESSAGE WHERE idMESSAGES=?",req.params.idmessage, function (error, result, client) {
       if(result[0].IS_READ==1){
           req.app.locals.inbox --;
           db.query("UPDATE ADMIN_MESSAGE SET IS_READ=0 WHERE idMESSAGES=?",req.params.idmessage, function (error, result, client) {
               res.render('compose', { title: 'Compor', emailDefault: req.params.mail, assunto: "Inserir assunto...", mensagem: "Inserir mensagem..."});
           });
       }
       else{res.render('compose', { title: 'Compor', emailDefault: req.params.mail, assunto: "Inserir assunto...", mensagem: "Inserir mensagem..."});}
    });
});
module.exports = router;
