/**
 * Created by rodrigohenriques on 9/24/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var UserWalletSchema = new Schema({
    _objectId: Schema.Types.ObjectId,
    _id: {type: String, default: uuid.v1},
    name: String,
    amount: Number,
    externalId: { type: String, unique : true, required : true, dropDups: true },
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('UserWallet', UserWalletSchema);