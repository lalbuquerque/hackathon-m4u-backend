/**
 * Created by rodrigohenriques on 9/24/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('node-uuid');

var UserSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    password: String,
    email: {type: String, unique: true},
    phone: {type: String, unique: true},
    cpf: {type: String, unique: true}
});

module.exports = mongoose.model('User', UserSchema);