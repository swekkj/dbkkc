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

router.get('/', function(req, res, next) {
  pool.getConnection(function(err,conn){
    if(err) console.error("pool connect error : "+err);
    var sql = "SELECT * FROM chatMeetingList";
    conn.query(sql,function(err,result){
      if(err) console.error("query connect error : " + err);
      console.log(result);
      res.render('chatlist',{list : result});
      conn.release();
    })
  })
});
router.get('/:idx', function(req, res, next) {
  var idx = req.params.idx;
  pool.getConnection(function(err,conn){
    if(err) console.error("pool connect error : "+err);
    var sql = "SELECT * FROM chatMeetingList WHERE idx="+idx;
    console.log(sql);
    conn.query(sql,function(err,result){
      if(err) console.error("query connect error : " + err);
      console.log(result[0]);
      res.render('chatroom',{roomInfo : result[0]});
      conn.release();
    })
  })
});
module.exports = router;
