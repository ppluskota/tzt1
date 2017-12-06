var Redis = require("ioredis");
var fs = require('fs');

var redis = new Redis({
    port: 12530,          // Redis port
    host: 'redis-12530.c12.us-east-1-4.ec2.cloud.redislabs.com',   // Redis host
    family: 4,           // 4(IPv4) or 6(IPv6)
    password: '1428571a',
    db: 0
});

'use strict'
const redis2 = require('redis')
const client = redis2.createClient(12530, 'redis-12530.c12.us-east-1-4.ec2.cloud.redislabs.com')
client.auth('1428571a', function(reply) {

})

client.eval(fs.readFileSync('../pluskota.lua'), 0, function(err, res) {
  console.log("Srednia liczba wypozyczonych ksiazek w okresie jednego miesiaca: " + arguments[1]);
});

module.exports = redis;
