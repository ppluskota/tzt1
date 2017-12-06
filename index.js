var cool = require('cool-ascii-faces');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

var index = require('./routes/index');
var about = require('./routes/about');
var lenders = require('./routes/lenders');

app.set('port', (process.env.PORT || 5000));


/** Application parts use declaration **/
app.use('/', index);
app.use('/about', about);
app.use('/lenders', lenders);

/** Common error handle **/
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
    response.render('pages/index')
});

app.get('/cool', function(request, response) {
    response.send(cool());
});

module.exports = app;

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
