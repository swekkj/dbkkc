
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit:5,
  host : 'localhost',
  user : 'root',
  database: 'db',
  password: 'passwd'
});

/* GET home page. */
router.get('/', function(req, res, next) {
      res.render('elements');
      connection.release();

});

module.exports = router;
