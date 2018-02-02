var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var db = req.connection;
    db.query('SELECT * FROM DEPLOY' , function(error, result, client){
        if (result.length != 0){
            console.log(result.length)
            res.cookie('deploy', 1)
        }
    })

    if (req.cookies.deploy == undefined){
      res.redirect('/indisponivel')
    }
    else if(req.cookies.onlineC === undefined){
      res.redirect('/signin')
    }
    else{
      res.redirect('/home')
    }
})

module.exports = router;
