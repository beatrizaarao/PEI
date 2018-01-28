var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:messageID', function(req, res, next) {
    var db = req.connection;
    db.query('SELECT * FROM ADMIN_MESSAGE where idMESSAGES=?',req.params.messageID,function (error, result, client) {
        mensagem = result;
        res.render('messageInfo', {title: 'Mensagem', mensagem: mensagem});
    });
});


module.exports = router;
