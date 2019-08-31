var express = require('express');

global.router = express.Router();
var router = global.router;

const Temp = require('../models/temp');
router = require('./chart');




/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('dashboard', { title: 'Express' });
});


router.post('/insert_new_temp', (req, res, next) => {
  const temp = req.body.temp;
});


var randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var insertFunc = () => {
  var newTemp = new Temp({
    temp: randomIntFromInterval(30, 55),
    date_created: Date.now()
  });

  newTemp.save((err) => {
    if (err) throw err
  });
}

// setInterval(insertFunc, 4000);

module.exports = router;
