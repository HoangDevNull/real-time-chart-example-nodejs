const router = global.router;
var io = require('../util/socketApi').io;
var Temp = require('../models/temp');
const socket = require('../util/socketApi');
var io = socket.io;



const changeStream = Temp.watch();

changeStream.on('change', (change) => {
    console.log(change);
    // send back to client
    io.emit('change-data', change.fullDocument);
});

io.on('connection', (socket) => {
    console.log(`Client ID :  ${socket} is connected`);
});

router.get('/show-chart', (req, res, next) => {
    res.render('chart', { title: "Real-time-chart" });
});


module.exports = router;