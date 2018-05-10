const express = require('express');
const router = express.Router();
const {Surges} = require('../models/surg');

// GET ADMIN HOME PAGE

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else {
        res.redirect('/users/login')
    }

}

/* GET ADMIN HOME PAGE */
router.get('/', ensureAuthenticated, (req, res) => {
    Surges.find().then((surgeries)=>{
        let doctors = [];

        surgeries.forEach((surg)=>{
           if (doctors.includes(surg.name.toString())) {
               console.log('hi')
           } else {
               console.log('no');
               doctors.push(surg.name)
           }
        });

        console.log(doctors);

        let show = surgeries.slice(0,5).reverse();
        res.render('ad-index', {
            title: 'Emle - Home',
            page: 'ad home',
            show,
            doctors
        });
    });

});

router.post('/',(req,res)=>{
   let search = req.body.search;

   Surges.find().then((surgeries)=>{
       if (surgeries) {
           let doctors = [];

           surgeries.forEach((surg)=>{
               if (doctors.includes(surg.name.toString())) {
                   console.log('hi')
               } else {
                   console.log('no');
                   doctors.push(surg.name)
               }
           });
           Surges.find({name : search}).then((surgeries)=>{
               res.render('ad-index', {
                   title: 'Emle - Home',
                   page: 'ad home',
                   surgeries,
                   doctors,
                   user : req.user
               });
           })

       } else {
           req.flash('error', 'There Is No Doctor With This Name')
           req.redirect('/ad')
       }
   })
});



/* GET ADD SURGERY PAGE */
router.get('/add',ensureAuthenticated, (req,res)=>{
    let user = req.user;
    if (user.type === 'doc'|| user.type === 'dataEnt')
    {
        res.render('ad-add',{
            title : 'Emle - Add',
            page : 'ad addSurg'
        })
    } else {
        res.redirect('/ad')
    }

});

/* POST ADD SURGERY */

router.post('/add',(req,res)=>{
    let name = req.body.name,
        date = req.body.date,
        location = req.body.location,
        desc = req.body.desc;

    req.checkBody('name','Name is Reqiured').notEmpty();
    req.checkBody('date','Date is Reqiured').notEmpty();
    req.checkBody('location','Location is Reqiured').notEmpty();
    req.checkBody('desc','Description is Reqiured').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        errors.forEach((err)=>{
           req.flash('error',err.msg);
        });
        res.redirect('/ad/add')
    } else {
        let newSerg = new Surges ({
            name,
            date,
            location,
            desc
        });

        newSerg.save();
        res.redirect('/ad')

    }


});

module.exports = router;