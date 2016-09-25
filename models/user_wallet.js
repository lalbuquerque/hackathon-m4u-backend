/**
 * Created by rodrigohenriques on 9/24/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var UserWalletSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    amount: Number,
    externalId: String,
    owner: String
});

module.exports = mongoose.model('UserWallet', UserWalletSchema);