let express = require('express');
let db = require('../config/db');
let router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});*/




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Main' });
});












module.exports = router;
