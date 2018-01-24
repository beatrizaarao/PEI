var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.connection;
    db.query("SELECT * from ORDEM WHERE STATUS=0", function (error, result, client){
        ordersListMiss = result;
        db.query("SELECT * from ORDEM WHERE STATUS!=0", function (error, result, client) {
            other = result;
            res.render('orders', {title: 'Encomendas', ordersMiss: ordersListMiss, otherOrders: other});
        });
    });

});

router.post("/:userID", function(req, res, next){
    var db = req.connection;
    db.query("SELECT * from ORDEM WHERE STATUS=0 and Client_NIF=?",req.params.userID, function (error, result, client){
        ordersListMiss = result;
        db.query("SELECT * from ORDEM WHERE STATUS!=0 and Client_NIF=?", function (error, result, client) {
            other = result;
            res.render('orders', {title: 'Encomendas', ordersMiss: ordersListMiss, otherOrders: other});
        });
    });
});

module.exports = router;
