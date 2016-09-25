/**
 * Created by rodrigohenriques on 9/24/16.
 */
var util = require('util');
var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
    console.log(req.method.toString() + ' -> ' + req.path);
    console.log('Headers:\n' + util.inspect(req.headers));
    console.log('Body:\n' + util.inspect(req.body));
    next();
});

module.exports = router;