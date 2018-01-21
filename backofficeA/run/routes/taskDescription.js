var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:taskID', function(req, res, next) {
    var db = req.connection;
    db.query("SELECT * FROM Task WHERE ID_TASK=?",req.params.taskID, function (error, result, client) {
        var tarefa = result
        db.query("SELECT * FROM CLIENT INNER JOIN Task ON Task.Client_NIF=CLIENT.NIF WHERE ID_TASK=?",req.params.taskID, function (error, result, client) {
            var cliente = result
            res.render('taskDescription', {title: 'Tasks', task:tarefa, client:cliente});
        });
    });
});

module.exports = router;
