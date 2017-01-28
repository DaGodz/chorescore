// Base
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://chorescore:tA86#Xt8X5h6Nicnz%0e@ds151208.mlab.com:51208/chorescore', function(err) {
    if (err) throw err;
});

mongoose.connection.on('open', function(ref) {
    console.log('Open to mongo server.');
});

mongoose.connection.on('connected', function(ref) {
    console.log('Connected to mongo server.');
});

mongoose.connection.on('disconnected', function(ref) {
    console.log('Disconnected from mongo server.');
});

mongoose.connection.on('error', function (err) {
    console.log('Error connecting to mongo server. ' + err);
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT;
var Chore = require('./app/models/chore');

// Routing
var router = express.Router();

// Middleware
router.use(function(req, res, next) {
    // log something
    console.log("Something's occuring.");
    console.log("mongoose.connection.readystate:" + mongoose.connection.readyState);
    next(); // make sure we go to the next route, not just stop here
});

router.get('/', function(req, res) {
    res.json({
        message: 'hooray! welcome to our api!'
    });
});

router.route('/chores').post(function(req, res) {
    var chore = new Chore();
    chore.name = req.body.name;

    chore.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Chore created!'
        });
    });
});

app.use('/api', router);

// Start
app.listen(port);
console.log('Magic happens on port ' + port);
