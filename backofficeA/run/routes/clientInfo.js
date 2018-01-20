var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:userID', function(req, res, next) {

    var db = req.connection;
    //console.log(req.params.userID);
    db.query("SELECT * FROM CLIENT WHERE NIF=?", req.params.userID, function (error, result, client) {
        userInfo = result;
        db.query("SELECT * FROM `ORDEM` WHERE Client_NIF= ?", req.params.userID, function (error, result, client) {
            numeroEncomendas = result;
            //console.log(numeroEncomendas[0]);
            db.query("SELECT BEGIN_DATE FROM `ORDEM` WHERE Client_NIF =? ORDER BY BEGIN_DATE LIMIT 1", req.params.userID, function (error, result, client) {
                ultimaEncomenda = result;

                res.render('clientInfo', {
                    title: 'ClientInfo',
                    user: userInfo,
                    nOrder: numeroEncomendas,
                    uOrder: ultimaEncomenda
                });
            });
        });
    });
})

router.post('/:id', function (req, res) {
    var db = req.connection;
    db.query("SELECT IS_BLOCKED FROM CLIENT WHERE NIF=?", req.params.id, function (error, result, client) {

        if(result[0].IS_BLOCKED==0){
            db.query("UPDATE CLIENT SET IS_BLOCKED=1 WHERE NIF=?", req.params.id, function (error, result, client) {
                res.redirect('back');
            });
        }
        else{
            db.query("UPDATE CLIENT SET IS_BLOCKED=0 WHERE NIF=?", req.params.id, function (error, result, client) {
                res.redirect('back');
            });
        }
    });

})

module.exports = router;
