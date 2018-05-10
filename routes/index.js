const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Emle-Home',
      page : 'index'
  });
});

module.exports = router;
