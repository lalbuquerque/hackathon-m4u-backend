/**
 * Created by rodrigohenriques on 9/24/16.
 */
var util = require('util');
var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    console.log(req.method.toString() + ' -> ' + req.path);
    next();
});

module.exports = router;