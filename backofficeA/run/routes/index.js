var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.connection;
  if(req.app.locals.admin.IS_LOGGED==1)
  {
      db.query("select MONTH(BEGIN_DATE) AS mes,YEAR(BEGIN_DATE) AS ano,count(ID_ORDER) AS valor from ORDEM WHERE Date(BEGIN_DATE) >= STR_TO_DATE(CONCAT(Year(CURRENT_DATE)-1,'-',MONTH(CURRENT_DATE),'-',DAY(CURRENT_DATE)), '%Y-%m-%d') group BY MONTH(BEGIN_DATE),YEAR(BEGIN_DATE)", function (error, result, client) {
          var lastYear=result;
          db.query("SELECT COUNT(ID_ORDER) AS last FROM ORDEM WHERE YEAR(BEGIN_DATE)= YEAR(CURRENT_DATE)-1 and MONTH(BEGIN_DATE) = MONTH(CURRENT_DATE) and DAY(BEGIN_DATE) <= DAY(CURRENT_DATE)", function (error, result, client) {
              var lastYearOrders = result
              db.query("SELECT COUNT(ID_ORDER) AS tamanho FROM ORDEM WHERE YEAR(BEGIN_DATE)= YEAR(CURRENT_DATE) and MONTH(BEGIN_DATE) = MONTH(CURRENT_DATE)", function (error, result, client){
                  var monthOrders = result
                  db.query("SELECT COUNT(NIF) as cli from CLIENT WHERE YEAR(data_registo)= YEAR(CURRENT_DATE) and MONTH(data_registo) = MONTH(CURRENT_DATE)", function (error, result, client){
                      var monthClients = result;
                      res.render('index', { title: 'Administrador', lastYear: lastYear, lastYearOrders: lastYearOrders[0].last, monthOrders: monthOrders[0].tamanho, monthClients: monthClients[0].cli });
                  });
              });

          });

      });
  }
  else {res.redirect('/')}

});

module.exports = router;
