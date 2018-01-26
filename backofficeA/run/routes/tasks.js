var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.connection;

    db.query("SELECT * FROM Task WHERE STATE=0", function (error, result, client){
        var missed = result;
        db.query("SELECT * FROM Task WHERE STATE=1", function (error, result, client){
        var unmissed = result;
        res.render('tasks', {missedd:missed, nMissedd:unmissed});
            });

    })
});
module.exports = router;
