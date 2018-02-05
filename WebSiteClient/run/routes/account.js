var express = require('express');
var router = express.Router();
var cookieParser = require("cookie-parser")
var user = require("../models/user")
var countries = require("../models/countries")
var formidable = require("formidable");

/* GET */
router.get('/', function (req, res, next) {
    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else if(req.cookies.onlineC === undefined){
        res.redirect('/signin')
    }
    else {

        var nif = req.cookies.onlineC;

        var db = req.connection;

        db.query('SELECT * FROM CLIENT WHERE NIF =' + nif, function (error, user) {

            if (!error && user.length > 0) {
                res.render('account', {countries: countries, user: user[0], errors: false});
            }

            res.render('account', {countries: countries, errors: false});
        });
    }
});

/* POST */ 
router.post('/', function (req, res, next) {

    if (req.cookies.deploy == undefined){
        res.redirect('/indisponivel')
    }
    else if(req.cookies.onlineC === undefined){
        res.redirect('/signin')
    }
    else {
        var form = new formidable.IncomingForm();
        var nif = req.cookies.onlineC;
        var context = {
            countries: countries,
            errors: false
        };

        user.find({'nif': nif}, function (error, user) {

            if (!error && user.length > 0) {
                context.user = user[0];

                form.parse(req, function (err, fields, files) {
                    context.user.email = fields.email;
                    context.user.pnome = fields.fname;
                    context.user.unome = fields.lname;
                    context.user.ename = fields.ename;
                    context.user.phone = fields.phone;
                    context.user.country = fields.country;
                    context.user.distrito = fields.distrito;
                    context.user.concelho = fields.concelho;
                    context.user.codpost = fields.codpost;
                    context.user.freguesia = fields.freguesia;
                    context.user.morada = fields.morada;
                    context.user.info = fields.info;

                    context.user.save(function (errors, user) {
                        if (errors) {
                            context.errors = errors.errors;
                            context.status = "Não foi possível guardar os dados";
                        } else {
                            context.status = "Dados guardados com sucesso";
                        }

                        res.render('account', context);
                    });
                });
            }
            else {
                res.render('account', context);
            }
        });
    }
});

module.exports = router;