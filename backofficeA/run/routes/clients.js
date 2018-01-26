var express = require('express');
var router = express.Router();
var util = require("util");
var fs = require("fs");
var path = require('path');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {

    var db = req.connection;
    var data = "";
    db.query('SELECT * FROM CLIENT',function(err,rows){
        //if(err) throw err;

        // console.log('Data received from Db:\n');

        var data = rows;
        //console.log(data);
        res.render('clients', { title: 'Clientes', dataGet: data });

    });


});

module.exports = router;
