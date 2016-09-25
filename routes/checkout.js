/**
 * Created by rodrigohenriques on 9/25/16.
 */
var util = require('util');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var User = require('../models/user');
var UserWallet = require('../models/user_wallet');
var Transaction = require('../models/transaction');
var express = require('express');
var router = express.Router();

router.post('/checkout', function (req, res) {
    var lioTransactionId = uuid.v1();
    var phone = req.body.phone;
    var points = req.body.points;
    var amount = req.body.amount;
    var fidelityChannel = req.body.fidelityChannel;
    var orderId = req.body.orderId;
    var merchant = req.body.merchant;
    var merchantId = req.body.merchantId;
    var clientId = req.body.clientId;
    var accessToken = req.body.accessToken;

    var transactionId = mongoose.Types.ObjectId();

    User.findOne({phone: phone})
        .exec(function (err, user) {
            if (err) {
                res.statusCode = 404;
                res.json({message: "User not found"});
            } else {
                UserWallet.findOne({owner: user._id, name: fidelityChannel})
                    .exec(function (err, wallet) {
                        if (wallet) {
                            if (wallet.amount > points) {
                                var request = require('request');

                                request({
                                    url: 'https://cielo-order-manager.m4u.com.br/api/v1/orders/' + orderId + '/transactions',
                                    method: 'POST',
                                    headers: {
                                        'Client-Id': clientId,
                                        'Merchant-Id': merchantId,
                                        'Access-token': accessToken,
                                        'Content-Type' :'application/json'
                                    },
                                    json: {
                                        "id": lioTransactionId,
                                        "externalId": transactionId,
                                        "description": fidelityChannel.toUpperCase() + " (" + points + " PONTOS)",
                                        "status": "CONFIRMED",
                                        "price": amount,
                                        "cieloCode": points,
                                        "authCode": points,
                                        "brand": fidelityChannel.toUpperCase(),
                                        "mask": wallet.externalId,
                                        "terminal": merchant,
                                        "paymentType": 1
                                    }
                                }, function(error, response, body){
                                    if (error) {
                                        res.send(error);
                                    } else {
                                        if (response.statusCode >= 200 && response.statusCode < 300) {
                                            var transaction = Transaction();

                                            transaction._id = mongoose.Types.ObjectId();
                                            transaction.points = points;
                                            transaction.amount = amount;
                                            transaction.merchant = merchant;
                                            transaction.description = fidelityChannel.toString();
                                            transaction.lio_transaction_id = lioTransactionId;
                                            transaction.user_wallet = wallet.id.toString();

                                            transaction.save(function (err) {
                                                if (err) {
                                                    res.send(err);
                                                } else {
                                                    wallet.amount = wallet.amount - points;
                                                    wallet.save(function(err, w) {
                                                        if (err) {
                                                            console.log(err)
                                                        } else {
                                                            console.log(w);
                                                        }
                                                    });

                                                    res.statusCode = 201;
                                                    res.json(transaction);
                                                }
                                            });
                                        } else {
                                            res.statusCode = 500;
                                            res.json({message: "Can't create transaction"});
                                        }
                                    }
                                });
                            }
                            else {
                                res.statusCode = 400;
                                res.json({message: "Insuficient points. Expected: " + points + ", Balance: " + wallet.amount});
                            }
                        } else {
                            res.statusCode = 400;
                            res.json({message: "This client has no " + fidelityChannel + " account registered"});
                        }
                    });
            }
        });
});

module.exports = router;