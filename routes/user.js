var util = require('util');
var User = require('../models/user');
var UserWallet = require('../models/user_wallet');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var path = '/user';

router.get(path, function (req, res, next) {
    res.send('Here we will list all users');
});

router.post(path, function (req, res) {
    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password;
    user.cpf = req.body.cpf;

    user.save(function(err) {
        if (err) {
            res.send(err);
        }
    });

    console.log(user);

    var userWallets = req.body.wallets.map(function (w) {
        var userWallet = UserWallet();

        userWallet.name = w.name;
        userWallet.amount = w.amount;
        userWallet.externalId = w.externalId;

        return userWallet;
    });

    console.log(userWallets);

    userWallets.forEach(function (w) {
        w.owner = user._objectId;

        w.save(function(err) {
            if (err) {
                res.send(err);
            }
        });

        user.wallets.push(w._objectId);
    });

    res.statusCode = 201;
    res.json(user);
});

module.exports = router;