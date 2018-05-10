const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const docSchema = new mongoose.Schema({
    type : {
        type : String,
        default : 'doc'
    },
   name : {
       type : String,
       index : true,
       required : true,
       minlength : 1,
       trim : true
   },
    email : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    dept : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
});

const stuSchema = new mongoose.Schema({
    type : {
        type : String,
        default : 'stu'
    },
   name : {
       type : String,
       index : true,
       required : true,
       minlength : 1,
       trim : true
   },
    email : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
    year : {
        type : Number,
        required : true,
        minlength : 1,
        trim : true
    },
    password : {
        type : String,
        required : true,
        minlength : 1,
        trim : true
    },
});

// NEW USER MODEL
let DocUser = mongoose.model('docUser',docSchema);
let StuUser = mongoose.model('stuUser',stuSchema);

module.exports = {
    DocUser,
    StuUser,
    newUser : (newUser,callback)=>{
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                newUser.password = hash;
                newUser.save(callback);
            });
        });
    }
};