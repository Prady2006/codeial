const mongoose = require('mongoose');

const resetTokenSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } ,
    accesstoken: {
        type: String,
        required: true
    } ,
    isValue: {
        type: Boolean
    }

});

const Reset = mongoose.model('Reset',resetTokenSchema);
module.exports = Reset ; 