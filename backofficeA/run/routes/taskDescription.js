var express = require('express');
var router = express.Router();
var app = express();

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

router.put('/porra/:id', function (req, res) {
    var inputValue = req.body.porra;
    var db = req.connection;
    db.query("SELECT Client_NIF FROM Task WHERE ID_TASK=?",req.params.id, function (error, result, client) {
        var cliente = result
        if(inputValue=="aceitar"){
            db.query("UPDATE CLIENT SET IS_APPROVED=1 WHERE NIF=?",cliente[0].Client_NIF, function (error, result, client) {
                db.query("UPDATE TASK SET STATE=1 WHERE ID_TASK=?",req.params.id, function (error, result, client) {
                    res.redirect('/tasks');
                });
            });
        }
        if(inputValue=="recusar"){
            db.query("UPDATE TASK SET STATE=1 WHERE ID_TASK=?",req.params.id, function (error, result, client) {
                res.redirect('/tasks');
            });
        }
    });
});

module.exports = router;
