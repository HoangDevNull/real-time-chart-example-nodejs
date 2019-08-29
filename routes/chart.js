const router = global.router;
var io = require('../util/socketApi').io;

var Temp = require('../models/temp');

const changeStream = Temp.watch();



changeStream.on('change', (change) => {
    console.log(change);
    // send back to client
    io.emit('changeData', change);
});

io.on('connection', (socket) => {
    console.log(`id ${socket} is connected`);
});

router.get('/show-chart', (req, res, next) => {
    res.render('chart', { title: "Real-time-chart" });
});


module.exports = router;