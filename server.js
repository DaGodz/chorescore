require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

var Chore = require('./app/models/chore');
var User = require('./app/models/user');

var port = process.env.PORT;

mongoose.connect(process.env.MONGODB, function(err) {
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

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Routing
var router = express.Router();

// Middleware
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    // log something
    console.log('Received: ' + req.method + ': ' + req.url);

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

        res.json( { success: 'true' } );
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

router.route('/users').post(function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err) {
        if (err) {
            res.send(err);
            return;
        }

        res.json( { success: 'true' } );
    });
});

router.route('/authenticate').post(function(req, res) {
    User.findOne({
       username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
            user.comparePassword(req.body.password, function(err, isMatch) {
                if (err) throw err;

                if (!isMatch) {
                    res.json({ success: false, message: 'Authentication failed. Password Incorrect.'});
                } else if (isMatch) {
                    var token = jwt.sign(user, 'tempsecretkey', {
                        expiresIn: 1440*60
                    });

                    res.json({
                        success: true,
                        message: "Token issued successfully.",
                        token: token
                    });
                }
            });
        }
    });
});

// Start
app.use('/api', router);
app.listen(port);
console.log('Listening on port ' + port);
