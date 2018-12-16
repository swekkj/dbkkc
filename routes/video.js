
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit:5,
  host : 'localhost',
  user : 'root',
  database: 'db',
  password: 'password'
});
/* GET home page. */
router.get('/', function(req, res, next) {
  pool.getConnection(function(err,conn){
    if(err) console.error("pool connect error : "+err);
    var sql = "SELECT * FROM videoMeetingList";
    conn.query(sql,function(err,result){
      if(err) console.error("query connect error : " + err);
      console.log(result);
      res.render('videolist',{list : result});
      conn.release();
    })
  })
});

router.get('/make',function(req,res,next){
  res.render('rtcMake');
})

module.exports = router;
