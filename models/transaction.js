/**
 * Created by rodrigohenriques on 9/24/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    points: Number,
    amount: Number,
    merchant: String,
    description: String,
    lio_transaction_id: String,
    user_wallet: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);