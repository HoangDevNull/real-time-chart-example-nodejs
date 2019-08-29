var express = require('express');

global.router = express.Router();
var router = global.router;

router = require('./chart');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
