var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var multer = require('multer');
var parser = require('body-parser').json();

var _storage = multer.diskStorage({
  destination: function(req, file, cb){
    var path = './public/images/room_img';
    cb(null, path); // 업로드할 경로 설정
  }
});
var upload = multer({storage : _storage});
var pool = mysql.createPool({
  connectionLimit:5,
  host : 'localhost',
  user : 'root',
  database: 'db',
  password: 'passwd'
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
    conn.query(sql,function(err,roomInfo){
      if(err) console.error("query connect error : " + err);
      var sql = "SELECT P.email FROM member AS m, personality AS P WHERE m.nickname='"+userNick+"' and m.phone=P.phone";
      conn.query(sql,function(err,result){
        if(err) console.error("query 2 connect error : "+err);
          res.render('chatroom',{roomInfo : roomInfo[0], nick: userNick, email: result[0]});
          conn.release();
      });
    });
  });
});

router.get('/make/:idx',function(req,res,next){
  var idx = req.params.idx;
  res.render('mc',{idx:idx,builder:userNick});
});
router.post('/make',function(req,res,next){
  console.log(req.body);
  var room_name = req.body.room_name;
  var room_pw = req.body.room_pw;
  var room_builder = req.body.room_builder;
  var idx = req.body.idx;
  var room_image = '/images/room_img/chat0'+String(idx)+".jpeg"

  var isLock=0;
  var sql;
  if(room_pw!=''){
    isLock=1;
    sql = "UPDATE chatMeetingList SET name='"+room_name+"', img='"+room_image+"',password='"+room_pw+"',builder='"+room_builder+"',isLock="+isLock+" WHERE idx="+idx
  }else{
    sql = "UPDATE chatMeetingList SET name='"+room_name+"', img='"+room_image+"',builder='"+room_builder+"',isLock="+isLock+" WHERE idx="+idx
  }
  pool.getConnection(function(err,conn){
    if(err) console.error("pool connect error : "+err);
    conn.query(sql,function(err,result){
      if(err) console.error("query connect error : " + err);
      res.redirect('/chat');
    });
  });
});
module.exports = router;
