var express = require('express');
var redis = require('../modules/redis.js');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: true});
var router = express.Router();

router.get('/', function (req, res, next) {

    var lenders = [];
    var promise = redis.pipeline();

    redis.smembers('wypozyczajacy', function (err, result) {
        var originResult = result;
        promise.exec(function (err, result) {
            res.render('lenders', {groupsArray: originResult});
        });
    });
});

router.get('/:id/edit', function (req, res) {
    var id = req.params.id;

    var editValue = {};

    redis.smembers('wypozyczajacy', function (err, result) {
      var origin = result
        for (var i = 0; i < origin.length; i++) {
          if (id == i.toString()) {
            editValue.name = origin[i];
          }
        }

        res.render('lenders_add', editValue);
    });
});

router.get('/add', function (req, res, next) {
    res.render('lenders_add', {});
});

router.post('/add', urlencodedParser, function (req, res) {
  if(req.body.lender_data) {
    redis.sadd('wypozyczajacy', req.body.lender_data);
  }
    res.redirect('/lenders/');
});

router.get('/:id/remove', function (req, res, next) {
    var id = req.params.id;

    redis.smembers('wypozyczajacy', function (err, result) {
      var origin = result
        for (var i = 0; i < origin.length; i++) {
          if (id == i.toString()) {
            redis.srem('wypozyczajacy', origin[i])
          }
        }
        res.redirect('/lenders/');
    });

});
module.exports = router;
