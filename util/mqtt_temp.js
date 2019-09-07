var mqtt = require('mqtt');
var Topic = 'tem2'; //subscribe to all topics
var Broker_URL = 'mqtt://192.168.2.160';

var options = {
    clientId: 'aa',
    port: 1883,
    keepalive: 60
};

var client = mqtt.connect(Broker_URL, options);

module.exports = client;