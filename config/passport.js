const LocalStrategy = require('passport-local').Strategy;
const {mongoose} = require('../db/mongoose');
const {DocUser,StuUser} = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {


    // Local DOCTOR Strategy
    passport.use(new LocalStrategy({
        usernameField: 'username'
    },(username, password, done)=>{
        DocUser.findOne({name : username},(err, user)=>{

            if (err) throw err;

            if(!user) {
                StuUser.findOne({name : username},(err, user)=>{
                    if (err) throw err;
                    if (!user) {
                        return done(null, false, {message : 'No User Found'})
                    }
                    bcrypt.compare(password, user.password, (err, isMath)=>{
                        if (err) throw err;
                        if (isMath) {
                            return done(null,user)
                        } else {
                            return done(null,false,{message: 'Wrong Password'})
                        }
                    })
                })
            } else {
                // Match Password
                bcrypt.compare(password, user.password, (err, isMath)=>{
                    if (err) throw err;
                    if (isMath) {
                        return done(null,user)
                    } else {
                        return done(null,false,{message: 'Wrong Password'})
                    }
                })
            }



        })

    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        StuUser.findById(id, function(err, user) {
            if (!user) {
                DocUser.findById(id, function(err, user) {
                  done(err,user)
                })
            } else {
                done(err, user);
            }
        });
    });
};
