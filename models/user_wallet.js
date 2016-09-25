/**
 * Created by rodrigohenriques on 9/24/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var UserWalletSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId() },
    name: String,
    amount: Number,
    externalId: { type: String, unique : true, required : true, dropDups: true },
    owner: Schema.Types.ObjectId
});

module.exports = mongoose.model('UserWallet', UserWalletSchema);