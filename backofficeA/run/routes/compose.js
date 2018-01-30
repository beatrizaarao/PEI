var express = require('express');
var router = express.Router();
var Isemail = require('isemail');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.app.locals.admin.IS_LOGGED==1){
        res.render('compose', { title: 'Compor', email: "example@email.com...", assunto: "Inserir assunto...", mensagem: "Inserir mensagem..."});
    }
    else {res.redirect('/')}
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
            db.query("INSERT INTO ADMIN_MESSAGE (SUBJECT, CONTENT, client_mail, Tipo, IS_READ, IS_FAVORITE, Data) VALUES (?,?, ?, 1,0,0,CURRENT_DATE)",params, function (error, result, client) {
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

router.post('/clientInfo/bymail/:mail', function(req, res, next) {
    res.render('compose', { title: 'Compor', emailDefault: req.params.mail, assunto: "Inserir assunto...", mensagem: "Inserir mensagem..."});
});
module.exports = router;
