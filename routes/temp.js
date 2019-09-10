const router = global.router;

// mqtt
const client = require('../util/mqtt_temp');
const Topic = 'tem2';
const mqtt = require('mqtt');

const socket = require('../util/socketApi');
var io = socket.io;

const Temp = require('../models/temp');

router.get('/insert_temp', (req, res, next) => {

    client.on('connect', mqtt_connect);
    client.on('reconnect', mqtt_reconnect);
    client.on('error', mqtt_error);
    client.on('message', mqtt_messsageReceived);
    client.on('close', mqtt_close);
})


function mqtt_connect() {
    console.log("Connecting MQTT");
    client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
    console.log("Subscribed to " + Topic);
    if (err) { console.log(err); }
}

function mqtt_reconnect(err) {
    console.log("Reconnect MQTT");
    if (err) { console.log(err); }
    client = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err) {
    console.log("Error!");
    if (err) { console.log(err); }
}

function after_publish() {
    //do nothing
}

function mqtt_messsageReceived(topic, message, packet) {
    // lay du lieu o day 
    console.log('Topic=' + topic + '  Message=' + message);
    let objSender = {
        temp: message,
        date_created: Date.now()
    }
    var newTemp = new Temp(objSender);

    newTemp.save((err) => {
        console.log(err);
    });
    console.log(`insert new temp ${message} successfully`);

    io.emit('change-data', objSender);
}

function mqtt_close() {
    console.log("Close MQTT");
}

module.exports = router;