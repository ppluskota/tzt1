var express = require('express');
var redis = require('../modules/redis.js');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});

var router = express.Router();

router.get('/', function(req, res, next) {

    var data = {};
    var promise = redis.pipeline()
        .get('NAZWA_APLIKACJI', function (err, result) {
            data.nazwa_aplikacji = result;
        })
        .get('OPIS_APLIKACJI', function (err, result) {
            data.opis_aplikacji = result;
        })
        .get("AUTOR_APLIKACJI", function (err, result) {
            data.autor_aplikacji = result;
        })
        .get("WERSJA_APLIKACJI", function (err, result) {
            data.wersja_aplikacji = result;
        })
        .exec();
    promise.then(function (result) {
        console.log("Site render" + result);
        res.render('about', data);
    });
});

router.get('/change', function (req, res, next) {

    var data = {};
    redis.pipeline()
        .get('NAZWA_APLIKACJI', function (err, result) {
            data.nazwa_aplikacji = result;
        })
        .get('OPIS_APLIKACJI', function (err, result) {
            data.opis_aplikacji = result;
        })
        .get("AUTOR_APLIKACJI", function (err, result) {
            data.autor_aplikacji = result;
        })
        .get("WERSJA_APLIKACJI", function (err, result) {
            data.wersja_aplikacji = result;
        })
        .exec(function (err, result) {
            res.render('about_edit', data);
        });
});

router.post('/change', urlencodedParser, function (req, res) {
    if (req.body.nazwa_aplikacji && req.body.opis_aplikacji && req.body.autor_aplikacji) {
        redis.set('NAZWA_APLIKACJI', req.body.nazwa_aplikacji);
        redis.set('OPIS_APLIKACJI', req.body.opis_aplikacji);
        redis.set('AUTOR_APLIKACJI', req.body.autor_aplikacji);
        redis.set('WERSJA_APLIKACJI', req.body.wersja_aplikacji);
        res.redirect('/');
    }
    else {
        res.redirect('/change');
    }
});

module.exports = router;
