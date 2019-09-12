var express = require('express');
global.router = express.Router();
var router = global.router;
const Temp = require('../models/temp');
router = require('./chart');


/** Get temps from mqtt */
// router = require('./temp');

/**Fuzzy */
const fuzzySystem = require('../util/fuzzy_predict');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('dashboard', { title: 'Express' });
});

/**Object detect page */
router.get('/detect', (req, res, next) => {
  res.render('objectdetect', { title: 'Object detect' });
});
/**predict page */
router.get('/predict', (req, res, next) => {
  let result = fuzzySystem.getPreciseOutput([35, 90])[0];
  console.log(result);
  
  if (result < 50) {
    console.log("on");
  } else {
    console.log("off");
  }
});

var randomIntFromInterval = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
var insertFunc = () => {
  var newTemp = new Temp({
    temp: randomIntFromInterval(40, 90),
    date_created: Date.now()
  });

  newTemp.save((err) => {
    if (err) throw err
  });
}
// setInterval(insertFunc, 3000);

module.exports = router;
