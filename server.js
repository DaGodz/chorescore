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
    next(); // make sure we go to the next route, not just stop here
});

router.route('/chores').post(function(req, res) {
    var chore = new Chore();
    chore.name = req.body.name;
    chore.who = req.body.who;
    chore.when = req.body.when;

    chore.save(function(err) {
        if (err) {
            res.send(err);
            return;
        }

        res.json({
            message: 'Chore created!'
        });
    });
});

router.route('/chores').get(function(req, res) {
    Chore.find(function(err, chores) {
        if (err) {
            res.send(err);
            return;
        }

        res.json(chores);
    });
});

// Start
app.use('/api', router);
app.listen(port);
console.log('Listening on port ' + port);
