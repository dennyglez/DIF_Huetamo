var express = require('express');
var router = express.Router();

var f = 'servicios/'; //Carpeta que organiza las vistas de servicios

/* GET users listing. */
router.get('/ejemplo', function(req, res, next) {
  res.render(f+'ejemplo');
});

module.exports = router;
