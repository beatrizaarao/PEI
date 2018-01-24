var express = require('express');
var router = express.Router();
var Isemail = require('isemail');
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('compose', { title: 'Compor', email: "example@email.com...", assunto: "Inserir assunto...", mensagem: "Inserir mensagem..."});
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
            db.query("INSERT INTO MESSAGE (SUBJECT, CONTENT, client_mail, Tipo) VALUES (?, ?, ?, 1)",params, function (error, result, client) {
                res.redirect('/messages');
            });

    }

});
module.exports = router;
