/**
 * Created by rodrigohenriques on 9/24/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var UserSchema = new Schema({
    _objectId: Schema.Types.ObjectId,
    _id: {type: String, unique: true, required: true, dropDups: true, default: uuid.v1},
    name: String,
    password: String,
    email: {type: String, unique: true, required: true, dropDups: true},
    phone: {type: String, unique: true, required: true, dropDups: true},
    cpf: {type: String, unique: true, required: true, dropDups: true},
    wallets: [{type: Schema.Types.ObjectId, ref: 'UserWallet'}]
});

module.exports = mongoose.model('User', UserSchema);