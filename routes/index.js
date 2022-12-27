var express = require('express');
require("dotenv").config();

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env);
  res.render('index', { title: 'Express' });
});

module.exports = router;
