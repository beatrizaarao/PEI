var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('about-us', { title: 'Sobre Nós' });
});

module.exports = router