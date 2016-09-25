var express = require('express');
var router = express.Router();

var path = '/user'

/* GET users listing. */
router.get(path, function(req, res, next) {
    res.send('Here we will list all users');
});

/* POST users (create new users). */
router.post(path, function (req, res, next) {
    var err = new Error("Internal server error");
    err.status = 500;

    next(err);
});

module.exports = router;