const mongoose = require('mongoose');

const surgSchema = new mongoose.Schema({
    name : {
       type : String,
       required : true,
       index : true,
       minlength : 1
    },
    date : {
        type : String,
        required : true,
        minlength : 1
    },
    location : {
        type : String,
        required : true,
        minlength : 1
    },
    desc : {
        type : String,
        required : true,
        minlength : 1
    }
});

let Surges = mongoose.model('surges', surgSchema);

module.exports = {Surges};