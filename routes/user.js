var util = require('util');
var mongoose = require('mongoose');
var User = require('../models/user');
var express = require('express');
var router = express.Router();

router.get('/user', function (req, res) {
    User.find().exec(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.statusCode = 200;
            res.json(result);
        }
    });
});

router.get('/user/:id', function (req, res) {
    var id = req.params.id;

    User.findOne({_id: id}).exec(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.statusCode = 200;
            res.json(result);
        }
    });
});

router.post('/user', function (req, res) {
    var user = new User();

    user._id = mongoose.Types.ObjectId();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password;
    user.cpf = req.body.cpf;

    user.save(function (err, u) {
        if (err) {
            res.send(err);
        } else {
            res.statusCode = 201;
            res.json(u);
        }
    });
});

module.exports = router;