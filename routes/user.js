var util = require('util');
var User = require('../models/user');
var UserWallet = require('../models/user_wallet');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

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

router.get('/user/:id/wallet', function (req, res) {
    var id = req.params.id;

    User.where({_id: id})
        .exec(function (err, user) {
            if (err) {
                res.statusCode = 404;
                res.json({message: "User not found"});
            } else {
                UserWallet.where({owner: id})
                    .exec(function (err, result) {
                        if (err) {
                            res.send(err);
                        } else {
                            res.statusCode = 200;
                            res.json(result);
                        }
                    });
            }
        });
});


router.post('/user/:id/wallet', function (req, res) {
    var id = req.params.id;

    User.where({_id: id})
        .exec(function (err, user) {
            if (err) {
                res.statusCode = 404;
                res.json({message: "User not found"});
            } else {
                var userWallet = UserWallet();

                userWallet.name = w.name;
                userWallet.amount = w.amount;
                userWallet.externalId = w.externalId;
                userWallet.owner = id;

                userWallet.save(function (err) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.statusCode = 201;
                        res.json(userWallet);
                    }
                });
            }
        });
});

module.exports = router;