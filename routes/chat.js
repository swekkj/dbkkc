var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit:5,
  host : 'localhost',
  user : 'root',
  database: 'dbtest',
  password: 'PASSWORD'
});
var userNick="";
router.post('/', function(req, res, next) {
  userNick = req.body.nick;
  console.log(userNick);
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

router.get('/', function(req, res, next) {
  var nick = req.params.nick;
  console.log(nick);
  pool.getConnection(function(err,conn){
    if(err) console.error("pool connect error : "+err);
    var sql = "SELECT * FROM chatMeetingList";
    conn.query(sql,function(err,result){
      if(err) console.error("query connect error : " + err);
      res.render('chatlist',{list : result});
      conn.release();
    })
  })
});
router.get('/:idx', function(req, res, next) {
  var idx = req.params.idx;
  console.log(userNick);
  pool.getConnection(function(err,conn){
    if(err) console.error("pool connect error : "+err);
    var sql = "SELECT * FROM chatMeetingList WHERE idx="+idx;
    console.log(sql);
    conn.query(sql,function(err,result1){
      if(err) console.error("query connect error : " + err);
      var sql = "SELECT P.email FROM member AS m, personality AS P WHERE m.nickname='"+userNick+"' and m.phone=P.phone";
      console.log(sql);
      conn.query(sql,function(err,result){
        if(err) console.error("query 2 connect error : "+err);
          console.log(result);
          res.render('chatroom',{roomInfo : result1[0], nick: userNick, email: result[0]});
          conn.release();
      });
    });
  });
});
module.exports = router;
