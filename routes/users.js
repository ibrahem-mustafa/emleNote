const express = require('express');
const router = express.Router();
const {DocUser,StuUser,newUser} = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


/* REGISTER ROUTE */
router.get('/register', (req, res) =>{
    res.render('register',{
        title: 'Emle-Register',
        page : 'register'
    })
});

/* REGISTER DOCTOR USER */
router.post('/register/doc',(req,res)=>{
    let name = req.body.name,
        email = req.body.email,
        dept = req.body.dept,
        pass1 = req.body.pass1,
        pass2 = req.body.pass2;

    DocUser.findOne({name : name}).then((x)=>{
        if (x) {
            req.flash('error', 'This User Name is Already Used');
            res.redirect('/users/register');
        } else {

            req.checkBody('name', 'Name is required').notEmpty();
            req.checkBody('email', 'Email is required').notEmpty();
            req.checkBody('email', 'Email is not valid').isEmail();
            req.checkBody('dept', 'Department is required').notEmpty();
            req.checkBody('pass1', 'Password is required').notEmpty();
            req.checkBody('pass2', 'Passwords don\'t match').equals(req.body.pass1);

            let errors = req.validationErrors();

            if (errors) {
                res.render('register',{
                    title : 'Emle - Register',
                    page : 'register',
                    errors

                });
            } else {
                let newUsers = new DocUser({
                    name : name,
                    email : email,
                    dept : dept,
                    password : pass1
                });

                newUser(newUsers,(err, user)=>{
                    if(err) throw err;
                    console.log(user)
                });

                req.flash('success', 'You are now registered and can login ');
                res.redirect('/users/login');
            }

        }
    });

});

/* REGISTER Student USER */
router.post('/register/stu',(req,res)=>{
    let name = req.body.name,
        email = req.body.email,
        year = req.body.year,
        pass1 = req.body.pass1,
        pass2 = req.body.pass2;

    StuUser.findOne({name : name}).then((x)=>{
        if (x) {
            req.flash('error','This User Name Is Already Used');
        }

    });

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('year', 'Academic Year is required').notEmpty();
    req.checkBody('pass1', 'Password is required').notEmpty();
    req.checkBody('pass2', 'Passwords don\'t match').equals(req.body.pass1);

    let errors = req.validationErrors();

    if (errors) {

        res.render('register',{
            title : 'Emle - Register',
            page : 'register',
            errors

        });
    } else {
        let newUsers = new StuUser({
            name : name,
            email : email,
            year : year,
            password : pass1
        });

        newUser(newUsers,(err, user)=>{
            if(err) throw err;
            console.log(user)
        });

        req.flash('success', 'You are now registered and can login ');
        res.redirect('/users/login');
    }
});

/* LOGIN ROUTE*/
router.get('/login',(req,res)=>{
    res.render('login',{
        title : 'Emle-Login',
        page : 'login'
    });
});



/* LOGIN TO THE SYSTEM */
router.post('/login',(req,res,next)=>{

    passport.authenticate('local',
        { successRedirect: '/ad',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req,res,next)

});


/* LOGOUT */
router.get('/logout',(req,res)=>{
   req.logout();
   req.flash('success','You are logged out');
   res.redirect('/users/login');
});




module.exports = router;